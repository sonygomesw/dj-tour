'use client'

import React, { useState, useRef, useEffect } from 'react'
import { DJSidebar } from '@/components/ui/DJSidebar'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/Toast'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { 
  Brain, 
  Send, 
  Loader2, 
  User, 
  Bot, 
  Mic, 
  Plus, 
  MessageSquare, 
  Trash2,
  Lightbulb,
  FileText,
  BarChart3,
  Edit3,
  Copy,
  Download,
  Share2,
  RefreshCw,
  MicIcon,
  Square,
  Menu,
  X
} from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isStreaming?: boolean
}

interface Conversation {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

export default function DJCoachAIPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null)
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [streamingMessage, setStreamingMessage] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const recognitionRef = useRef<any>(null)
  const { showToast, ToastContainer } = useToast()

  const quickPrompts = [
    {
      icon: <Lightbulb className="w-5 h-5" />,
          title: "Develop a plan",
    description: "How to develop my DJ career in 6 months?",
    suggestions: ["Marketing plan", "Booking strategy", "Network development"]
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Analyze data",
              description: "Analyze my Spotify stats and give me advice",
        suggestions: ["Audience analysis", "Playlist optimization", "Genre trends"]
    },
    {
      icon: <FileText className="w-5 h-5" />,
          title: "Strategic summary",
    description: "Summarize the best strategies to break through on Instagram",
    suggestions: ["Viral content", "Community engagement", "Artist collaboration"]
    }
  ]

  const currentConversation = conversations.find(c => c.id === currentConversationId)
  const messages = currentConversation?.messages || []

  // Auto-scroll optimisé
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest'
    })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, streamingMessage])

  // Charger les conversations depuis localStorage
  useEffect(() => {
    const savedConversations = localStorage.getItem('dj-coach-conversations')
    if (savedConversations) {
      const parsed = JSON.parse(savedConversations)
      setConversations(parsed.map((conv: any) => ({
        ...conv,
        createdAt: new Date(conv.createdAt),
        updatedAt: new Date(conv.updatedAt),
        messages: conv.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      })))
    }
  }, [])

  // Sauvegarder les conversations
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem('dj-coach-conversations', JSON.stringify(conversations))
    }
  }, [conversations])

  const generateConversationTitle = (firstMessage: string) => {
    const words = firstMessage.split(' ').slice(0, 4).join(' ')
    return words.length > 30 ? words.substring(0, 30) + '...' : words
  }

  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'New conversation',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setConversations(prev => [newConversation, ...prev])
    setCurrentConversationId(newConversation.id)
    setInputMessage('')
    setStreamingMessage('')
  }

  const deleteConversation = (conversationId: string) => {
    setConversations(prev => prev.filter(c => c.id !== conversationId))
    if (currentConversationId === conversationId) {
      setCurrentConversationId(null)
    }
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
          showToast('Message copied!', 'success')
  }

  const exportConversation = () => {
    if (!currentConversation) return
    
    const exportData = {
      title: currentConversation.title,
      date: currentConversation.createdAt.toLocaleDateString(),
      messages: currentConversation.messages.map(msg => ({
        role: msg.role === 'user' ? 'Vous' : 'DJ Coach AI',
        content: msg.content,
        time: msg.timestamp.toLocaleTimeString()
      }))
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${currentConversation.title}.json`
    a.click()
    URL.revokeObjectURL(url)
          showToast('Conversation exported!', 'success')
  }

  // Voice-to-text
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      showToast('Your browser does not support voice recognition', 'error')
      return
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'fr-FR'
    
    recognition.onstart = () => {
      setIsListening(true)
              showToast('Listening...', 'info')
    }
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setInputMessage(prev => prev + transcript)
              showToast('Message dictated successfully!', 'success')
    }
    
    recognition.onend = () => {
      setIsListening(false)
    }
    
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error)
      setIsListening(false)
    }
    
    recognitionRef.current = recognition
    recognition.start()
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    // Sécurité : limite de tokens
    if (inputMessage.length > 4000) {
              showToast('Message too long. Please rephrase in less than 4000 characters.', 'warning')
      return
    }

    // Sécurité : détection prompt injection basique
    const suspiciousPatterns = [
      'ignore previous instructions',
      'forget everything',
      'system prompt',
      'you are now',
      'act as if'
    ]
    
    if (suspiciousPatterns.some(pattern => inputMessage.toLowerCase().includes(pattern))) {
              showToast('Unauthorized message. Please rephrase your question.', 'error')
      return
    }

    let conversationId = currentConversationId

          // Create a new conversation if necessary
    if (!conversationId) {
      const newConversation: Conversation = {
        id: Date.now().toString(),
        title: generateConversationTitle(inputMessage),
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }
      setConversations(prev => [newConversation, ...prev])
      conversationId = newConversation.id
      setCurrentConversationId(conversationId)
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    // Ajouter le message utilisateur
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId 
        ? { 
            ...conv, 
            messages: [...conv.messages, userMessage],
            title: conv.messages.length === 0 ? generateConversationTitle(inputMessage) : conv.title,
            updatedAt: new Date()
          }
        : conv
    ))

    setInputMessage('')
    setIsLoading(true)
    setStreamingMessage('')

    try {
      const response = await fetch('/api/dj-coach-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...(currentConversation?.messages || []), userMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        })
      })

      if (!response.ok) {
        throw new Error('Connection error')
      }

      const data = await response.json()
      
      // Simulation du streaming (à remplacer par un vrai streaming plus tard)
      const content = data.content
      let currentText = ''
      
      for (let i = 0; i < content.length; i++) {
        currentText += content[i]
        setStreamingMessage(currentText)
        await new Promise(resolve => setTimeout(resolve, 20))
      }
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content,
        timestamp: new Date()
      }

      // Ajouter la réponse de l'assistant
      setConversations(prev => prev.map(conv => 
        conv.id === conversationId 
          ? { 
              ...conv, 
              messages: [...conv.messages, assistantMessage],
              updatedAt: new Date()
            }
          : conv
      ))
      
      setStreamingMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I\'m experiencing a technical issue. Please try again or rephrase your question.',
        timestamp: new Date()
      }
      setConversations(prev => prev.map(conv => 
        conv.id === conversationId 
          ? { 
              ...conv, 
              messages: [...conv.messages, errorMessage],
              updatedAt: new Date()
            }
          : conv
      ))
      setStreamingMessage('')
    } finally {
      setIsLoading(false)
    }
  }

  const retryLastMessage = () => {
    if (messages.length >= 2) {
      const lastUserMessage = messages[messages.length - 2]
      if (lastUserMessage.role === 'user') {
        setInputMessage(lastUserMessage.content)
        inputRef.current?.focus()
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const useQuickPrompt = (prompt: string) => {
    setInputMessage(prompt)
    inputRef.current?.focus()
  }

  const adjustTextareaHeight = () => {
    const textarea = inputRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px'
    }
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [inputMessage])

  return (
    <div className="flex h-screen bg-gray-50 scale-50 origin-top-left">
      {/* DJ Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <DJSidebar />
      </div>
      
      {/* Chat Sidebar */}
      <div className="w-96 bg-gray-800 text-white flex flex-col lg:ml-96 hidden md:flex">
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <Button
            onClick={createNewConversation}
            className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white border-gray-600 text-xl"
          >
            <Plus className="w-5 h-5" />
            New conversation
          </Button>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto p-4">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`group flex items-center gap-3 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors ${
                currentConversationId === conversation.id ? 'bg-gray-700' : ''
              }`}
              onClick={() => setCurrentConversationId(conversation.id)}
            >
              <MessageSquare className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <span className="text-2xl truncate flex-1">{conversation.title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  deleteConversation(conversation.id)
                }}
                className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-600 transition-opacity"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-violet-400" />
              <span className="text-sm text-gray-300">DJ Coach AI</span>
            </div>
            {currentConversation && (
              <div className="flex gap-1">
                <button
                  onClick={exportConversation}
                  className="p-1 rounded hover:bg-gray-600 transition-colors"
                  title="Exporter la conversation"
                >
                  <Download className="w-4 h-4 text-gray-400" />
                </button>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ 
                        title: currentConversation.title,
                        text: currentConversation.messages.map(m => `${m.role}: ${m.content}`).join('\n\n')
                      })
                    } else {
                      // Fallback pour les navigateurs qui ne supportent pas l'API Share
                      const shareText = `${currentConversation.title}\n\n${currentConversation.messages.map(m => `${m.role}: ${m.content}`).join('\n\n')}`
                      navigator.clipboard.writeText(shareText)
                      showToast('Conversation copied for sharing!', 'success')
                    }
                  }}
                  className="p-1 rounded hover:bg-gray-600 transition-colors"
                  title="Partager la conversation"
                >
                  <Share2 className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <button
          onClick={() => setShowMobileSidebar(true)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">DJ Coach AI</h1>
        <button
          onClick={createNewConversation}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {showMobileSidebar && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileSidebar(false)} />
          <div className="absolute left-0 top-0 h-full w-80 bg-gray-800 text-white flex flex-col">
            {/* Mobile Header */}
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Conversations</h2>
              <button
                onClick={() => setShowMobileSidebar(false)}
                className="p-1 rounded hover:bg-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* New Conversation Button */}
            <div className="p-6 border-b border-gray-700">
              <Button
                onClick={() => {
                  createNewConversation()
                  setShowMobileSidebar(false)
                }}
                className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white border-gray-600 text-xl"
              >
                <Plus className="w-5 h-5" />
                New conversation
              </Button>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto p-4">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`group flex items-center gap-3 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors ${
                    currentConversationId === conversation.id ? 'bg-gray-700' : ''
                  }`}
                  onClick={() => {
                    setCurrentConversationId(conversation.id)
                    setShowMobileSidebar(false)
                  }}
                >
                  <MessageSquare className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <span className="text-2xl truncate flex-1">{conversation.title}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteConversation(conversation.id)
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-600 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Mobile Footer */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-violet-400" />
                  <span className="text-sm text-gray-300">DJ Coach AI</span>
                </div>
                {currentConversation && (
                  <div className="flex gap-1">
                    <button
                      onClick={exportConversation}
                      className="p-1 rounded hover:bg-gray-600 transition-colors"
                      title="Exporter"
                    >
                      <Download className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {messages.length === 0 ? (
          // Welcome Screen
          <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
            <div className="max-w-6xl w-full">
              <div className="text-center mb-8 md:mb-16">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-violet-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <Brain className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <h1 className="text-6xl md:text-8xl font-semibold text-gray-800 mb-2 md:mb-3">DJ Coach AI</h1>
                <p className="text-2xl md:text-3xl text-gray-600 px-4">Your assistant to develop your DJ career faster</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 px-4 md:px-0">
                {quickPrompts.map((prompt, index) => (
                                      <div
                      key={index}
                      onClick={() => useQuickPrompt(prompt.description)}
                      className="p-6 md:p-8 border border-gray-200 rounded-xl hover:border-gray-300 cursor-pointer transition-all bg-white hover:shadow-md"
                    >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-gray-600">{prompt.icon}</div>
                      <h3 className="font-semibold text-gray-800 text-2xl">{prompt.title}</h3>
                    </div>
                    <p className="text-xl text-gray-600 leading-relaxed mb-3">{prompt.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {prompt.suggestions.map((suggestion, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-100 text-lg text-gray-600 rounded-full"
                        >
                          {suggestion}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Chat Messages
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 md:py-8">
              <div className="space-y-6 md:space-y-8">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 bg-violet-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    
                    <div className={`max-w-4xl ${message.role === 'user' ? 'order-1' : ''}`}>
                      <div
                        className={`px-4 md:px-6 py-3 md:py-4 rounded-2xl ${
                          message.role === 'user'
                            ? 'bg-violet-500 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                                              >
                                                  <div className="text-xl md:text-2xl leading-relaxed">
                          {message.role === 'assistant' ? (
                            <div className="prose prose-xl max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700">
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {message.content}
                              </ReactMarkdown>
                            </div>
                          ) : (
                            message.content
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2 px-2">
                        <div className="text-lg text-gray-500">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                        {message.role === 'assistant' && (
                          <div className="flex gap-1">
                            <button
                              onClick={() => copyMessage(message.content)}
                              className="p-1 rounded hover:bg-gray-200 transition-colors"
                              title="Copier"
                            >
                              <Copy className="w-3 h-3 text-gray-400" />
                            </button>
                            <button
                              onClick={retryLastMessage}
                              className="p-1 rounded hover:bg-gray-200 transition-colors"
                              title="Regenerate"
                            >
                              <RefreshCw className="w-3 h-3 text-gray-400" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {message.role === 'user' && (
                      <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Message en cours de streaming */}
                {streamingMessage && (
                  <div className="flex gap-4 justify-start">
                    <div className="w-8 h-8 bg-violet-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="max-w-4xl">
                      <div className="px-6 py-4 rounded-2xl bg-gray-100 text-gray-800">
                        <div className="text-2xl leading-relaxed">
                          <div className="prose prose-xl max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {streamingMessage}
                            </ReactMarkdown>
                          </div>
                          <span className="inline-block w-2 h-5 bg-violet-500 ml-1 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {isLoading && !streamingMessage && (
                  <div className="flex gap-4 justify-start">
                    <div className="w-8 h-8 bg-violet-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-100 px-6 py-4 rounded-2xl">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-gray-600 text-2xl">DJ Coach is analyzing your request...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            <div className="relative flex items-end gap-2 md:gap-3">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Write your message..."
                  className="w-full px-3 md:px-4 py-2 md:py-3 pr-16 md:pr-20 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-xl md:text-2xl placeholder:text-gray-500"
                  rows={1}
                  style={{ minHeight: '44px' }}
                />
                <div className="absolute right-3 top-3 flex gap-1">
                  <button
                    onClick={isListening ? stopListening : startListening}
                    className={`p-1 rounded transition-colors ${
                      isListening 
                        ? 'text-red-500 hover:text-red-600' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                    title={isListening ? 'Stop listening' : 'Start listening'}
                  >
                    {isListening ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                </div>
              </div>
                              <Button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="p-2 md:p-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg"
                >
                  <Send className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
            </div>
            {inputMessage.length > 3500 && (
              <div className="text-xs text-orange-500 mt-1">
                Warning: long message ({inputMessage.length}/4000 characters)
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Toast Container */}
      <ToastContainer />
    </div>
  )
} 