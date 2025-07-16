import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabase } from "@/lib/supabase";
import Stripe from "stripe";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  try {
    // Vérifier la signature du webhook
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(
          event.data.object as Stripe.Checkout.Session,
        );
        break;
      case "payment_intent.succeeded":
        await handlePaymentIntentSucceeded(
          event.data.object as Stripe.PaymentIntent,
        );
        break;
      case "payment_intent.payment_failed":
        await handlePaymentIntentFailed(
          event.data.object as Stripe.PaymentIntent,
        );
        break;
      case "customer.subscription.created":
        await handleSubscriptionCreated(
          event.data.object as Stripe.Subscription,
        );
        break;
      case "customer.subscription.updated":
        await handleSubscriptionUpdated(
          event.data.object as Stripe.Subscription,
        );
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(
          event.data.object as Stripe.Subscription,
        );
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }
}

// Gérer la session de paiement complétée
async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
) {
  console.log("✅ Checkout session completed:", session.id);
  const customerEmail = session.customer_details?.email;
  const productId = session.metadata?.product_id;

  if (!customerEmail) {
    console.error("No customer email found in session");
    return;
  }

  try {
    // Pour l'instant, on met juste à jour le profil si l'utilisateur existe
    // On peut améliorer cette logique plus tard
    console.log("Payment completed for:", customerEmail);

    // Enregistrer la transaction
    const { error: transactionError } = await supabase
      .from("transactions")
      .insert({
        stripe_session_id: session.id,
        amount: 9700, // 97€ en centimes
        currency: "eur",
        status: "completed",
        product_id: productId,
        created_at: new Date().toISOString(),
      });

    if (transactionError) {
      console.error("Error saving transaction:", transactionError);
    }

    // Envoyer un email de confirmation
    await sendWelcomeEmail(customerEmail, session.id);
  } catch (error) {
    console.error("Error handling checkout session completed:", error);
    throw error;
  }
}

// Gérer le paiement réussi
async function handlePaymentIntentSucceeded(
  paymentIntent: Stripe.PaymentIntent,
) {
  console.log("✅ Payment intent succeeded:", paymentIntent.id);
  // Logique supplémentaire si nécessaire
  // Par exemple, envoyer des notifications, mettre à jour des statistiques, etc.
}

// Gérer l'échec de paiement
async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log("❌ Payment intent failed:", paymentIntent.id);
  // Logique pour gérer les échecs de paiement
  // Par exemple, envoyer un email de récupération, notifier l'utilisateur, etc.
}

// Gérer la création d'abonnement (pour le futur)
async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log("✅ Subscription created:", subscription.id);
  // Logique pour les abonnements si vous en ajoutez plus tard
}

// Gérer la mise à jour d'abonnement
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log("📝 Subscription updated:", subscription.id);
  // Logique pour les mises à jour d'abonnement
}

// Gérer la suppression d'abonnement
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log("🗑️ Subscription deleted:", subscription.id);
  // Logique pour la suppression d'abonnement
}

// Fonction utilitaire pour mettre à jour le statut premium
async function updateUserPremiumStatus(
  userId: string,
  isPremium: boolean,
  sessionId: string,
) {
  try {
    // Mettre à jour le profil utilisateur
    const { error: profileError } = await supabase.from("profiles").upsert({
      id: userId,
      is_premium: isPremium,
      premium_since: isPremium ? new Date().toISOString() : null,
      stripe_session_id: sessionId,
      updated_at: new Date().toISOString(),
    });

    if (profileError) throw profileError;

    // Créer un enregistrement de transaction
    const { error: transactionError } = await supabase
      .from("transactions")
      .insert({
        user_id: userId,
        stripe_session_id: sessionId,
        amount: 9700, // 97€ en centimes
        currency: "eur",
        status: "completed",
        created_at: new Date().toISOString(),
      });

    if (transactionError) throw transactionError;

    console.log(`✅ User ${userId} premium status updated to ${isPremium}`);
  } catch (error) {
    console.error("Error updating user premium status:", error);
    throw error;
  }
}

// Fonction utilitaire pour générer un mot de passe temporaire
function generateTemporaryPassword(): string {
  return (
    Math.random().toString(36).slice(-12) +
    Math.random().toString(36).slice(-12)
  );
}

// Fonction utilitaire pour envoyer un email de bienvenue
async function sendWelcomeEmail(email: string, sessionId: string) {
  // Ici vous pouvez intégrer votre service d'email (SendGrid, Resend, etc.)
  console.log(`📧 Welcome email sent to ${email} for session ${sessionId}`);
  // Exemple avec un service d'email :
  // await emailService.sendWelcomeEmail(email, sessionId);
}
