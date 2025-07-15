import { useState } from 'react'
import { Plus, Trash2, Instagram } from 'lucide-react'
import { GlassContainer } from './GlassContainer'

interface Club {
  id: string
  name: string
  instagram: string
}

interface ClubListBuilderProps {
  onComplete: (clubs: Club[]) => void
  minClubs?: number
}

export function ClubListBuilder({ onComplete, minClubs = 20 }: ClubListBuilderProps) {
  const [clubs, setClubs] = useState<Club[]>([])
  const [newClub, setNewClub] = useState<Omit<Club, 'id'>>({
    name: '',
    instagram: ''
  })

  const handleAddClub = () => {
    if (!newClub.name) return

    const club: Club = {
      id: Date.now().toString(),
      ...newClub
    }

    setClubs([...clubs, club])
    setNewClub({ name: '', instagram: '' })

    if (clubs.length + 1 >= minClubs) {
      onComplete([...clubs, club])
    }
  }

  const handleRemoveClub = (id: string) => {
    setClubs(clubs.filter(club => club.id !== id))
  }

  return (
    <GlassContainer className="p-6">
      <div className="space-y-8">
        {/* Tutorial */}
        <div className="bg-white/5 rounded-lg p-4 text-sm text-gray-700 dark:text-white/80">
          <p className="font-medium mb-2">💡 Astuce pour trouver des clubs :</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Cherche des DJs similaires à toi qui tournent déjà.</li>
            <li>Sinon, cherche des DJs qui tournent : dans leur bio, il y a souvent leur booking agency. Cherche ensuite cette booking agency sur Instagram.</li>
            <li>Les booking agencies postent les tournées de leurs DJs. Regarde les DJs qu’elles représentent.</li>
            <li>Tu verras les BIG DJs (gros festivals, grosses boîtes, gros cachets), les DJs “entre deux” et les nouveaux DJs.</li>
            <li>Regarde où sont bookés les DJs “entre deux” et les nouveaux DJs.</li>
            <li>Dans les followers des booking agencies, tu trouveras beaucoup de directeurs de nightclubs et de talent buyers.</li>
            <li>Si tu fais ça avec 5 à 10 booking agencies de DJs, tu peux trouver une tonne de contacts.</li>
          </ul>
        </div>

        {/* Add New Club Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Nom du club
              </label>
              <input
                type="text"
                value={newClub.name}
                onChange={(e) => setNewClub({ ...newClub, name: e.target.value })}
                placeholder="Ex: Le Rex Club"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-gray-900 dark:text-white placeholder:text-gray-500 dark:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Instagram
              </label>
              <div className="relative">
                <Instagram className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-white/40 w-4 h-4" />
                <input
                  type="text"
                  value={newClub.instagram}
                  onChange={(e) => setNewClub({ ...newClub, instagram: e.target.value })}
                  placeholder="@clubname"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-gray-900 dark:text-white placeholder:text-gray-500 dark:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>
            </div>
          </div>
          <button
            onClick={handleAddClub}
            className="w-full flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-gray-900 dark:text-white py-3 px-4 rounded-xl font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Ajouter ce club
          </button>
        </div>

        {/* Club List */}
        {clubs.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Clubs ajoutés</h3>
            <div className="space-y-3">
              {clubs.map((club) => (
                <div
                  key={club.id}
                  className="flex items-center justify-between bg-white/5 rounded-lg p-4"
                >
                  <div>
                    <h4 className="text-gray-900 dark:text-white font-medium">{club.name}</h4>
                    {club.instagram && (
                      <div className="flex items-center gap-1 mt-1 text-sm text-gray-600 dark:text-white/60">
                        <Instagram className="w-3 h-3" />
                        {club.instagram}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleRemoveClub(club.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </GlassContainer>
  )
} 