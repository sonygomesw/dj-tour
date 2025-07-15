'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useMissions } from '@/contexts/MissionContext'
import { useAuth } from '@/components/auth/AuthProvider'
import { Button } from '@/components/ui/button'

export default function TestMissionsPage() {
  const { user } = useAuth()
  const { 
    getMissionStatus, 
    startMission, 
    completeMission,
    userMissions,
    userStats,
    loading 
  } = useMissions()
  
  const [testResults, setTestResults] = useState<string[]>([])

  const addLog = (message: string) => {
    console.log(message)
    setTestResults(prev => [...prev, message])
  }

  useEffect(() => {
    addLog('🔍 TestMissions: Component mounted')
    addLog(`👤 User: ${user ? user.id : 'Not connected'}`)
    addLog(`📊 UserMissions: ${userMissions.length} missions`)
    addLog(`📈 UserStats: ${userStats ? 'Loaded' : 'Not loaded'}`)
    addLog(`⏳ Loading: ${loading}`)
  }, [user, userMissions, userStats, loading])

  const testConnection = async () => {
    addLog('🧪 Testing Supabase connection...')
    try {
      const { data, error } = await supabase
        .from('user_missions')
        .select('count')
        .limit(1)
      
      if (error) {
        addLog(`❌ Supabase error: ${error.message}`)
      } else {
        addLog('✅ Supabase connection successful')
      }
    } catch (err) {
      addLog(`❌ Connection error: ${err}`)
    }
  }

  const testMissionStart = async () => {
    if (!user) {
      addLog('❌ Cannot test: No user connected')
      return
    }
    
    addLog('🧪 Testing mission start...')
    try {
      await startMission('instagram-tiktok-setup')
      addLog('✅ Mission started successfully')
    } catch (err) {
      addLog(`❌ Start mission error: ${err}`)
    }
  }

  const testMissionComplete = async () => {
    if (!user) {
      addLog('❌ Cannot test: No user connected')
      return
    }
    
    addLog('🧪 Testing mission completion...')
    try {
      await completeMission('instagram-tiktok-setup', 'Test completion')
      addLog('✅ Mission completed successfully')
    } catch (err) {
      addLog(`❌ Complete mission error: ${err}`)
    }
  }

  const createTablesManually = async () => {
    addLog('🧪 Testing table creation...')
    try {
      // Test if we can insert a test mission
      const { data, error } = await supabase
        .from('user_missions')
        .insert({
          user_id: user?.id,
          mission_id: 'test-mission',
          status: 'completed',
          progress: 100
        })
        .select()

      if (error) {
        addLog(`❌ Table error: ${error.message}`)
        if (error.message.includes('relation "user_missions" does not exist')) {
          addLog('📋 Tables do not exist. Please run the SQL setup script in Supabase.')
        }
      } else {
        addLog('✅ Tables exist and working')
        // Clean up test data
        await supabase
          .from('user_missions')
          .delete()
          .eq('mission_id', 'test-mission')
      }
    } catch (err) {
      addLog(`❌ Table test error: ${err}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          🧪 Test Missions System
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tests */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Tests
            </h2>
            <div className="space-y-4">
              <Button onClick={testConnection} className="w-full">
                Test Supabase Connection
              </Button>
              <Button onClick={testMissionStart} className="w-full">
                Test Mission Start
              </Button>
              <Button onClick={testMissionComplete} className="w-full">
                Test Mission Complete
              </Button>
              <Button onClick={createTablesManually} className="w-full">
                Test Tables Exist
              </Button>
            </div>
          </div>

          {/* Status */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Current Status
            </h2>
            <div className="space-y-2 text-sm">
              <div className={`p-2 rounded ${user ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                User: {user ? `Connected (${user.id})` : 'Not connected'}
              </div>
              <div className={`p-2 rounded ${userMissions.length > 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                Missions: {userMissions.length} loaded
              </div>
              <div className={`p-2 rounded ${userStats ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                Stats: {userStats ? 'Loaded' : 'Not loaded'}
              </div>
              <div className={`p-2 rounded ${loading ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                Loading: {loading ? 'Yes' : 'No'}
              </div>
            </div>
          </div>
        </div>

        {/* Logs */}
        <div className="mt-8 bg-black text-green-400 p-4 rounded-lg font-mono text-sm h-96 overflow-y-auto">
          <h3 className="text-white font-bold mb-2">Console Logs:</h3>
          {testResults.map((result, index) => (
            <div key={index} className="mb-1">
              {result}
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            📋 Instructions
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800 dark:text-blue-200">
            <li>First, make sure you're logged in (go to /auth if needed)</li>
            <li>Test Supabase connection</li>
            <li>Test if tables exist</li>
            <li>If tables don't exist, run the SQL script in Supabase dashboard</li>
            <li>Test mission start and completion</li>
          </ol>
        </div>
      </div>
    </div>
  )
} 