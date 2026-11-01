'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Users, Phone, Clock, RefreshCw, LayoutDashboard } from 'lucide-react'

type Booking = {
  id: string
  client_name: string
  client_phone: string
  service_name: string
  status: string
  created_at: string
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchBookings = async () => {
    setIsLoading(true)
    const { data } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) setBookings(data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  return (
    <div className="min-h-screen bg-zinc-100 pb-20">
      {/* Шапка админки */}
      <div className="bg-zinc-900 px-6 py-8 text-white shadow-lg flex justify-between items-center sticky top-0 z-50">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6" /> CRM Панель
          </h1>
          <p className="text-sm text-zinc-400 mt-1">Управление записями</p>
        </div>
        <button onClick={fetchBookings} className="p-3 bg-zinc-800 rounded-xl active:scale-95 transition">
          <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Статистика */}
      <div className="px-4 -mt-4 relative z-10 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-zinc-200 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-zinc-500">Всего заявок</p>
            <p className="text-3xl font-black text-zinc-900">{bookings.length}</p>
          </div>
          <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
            <Users className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Список заявок */}
      <div className="px-4 space-y-4">
        {bookings.length === 0 && !isLoading ? (
          <div className="text-center py-10 text-zinc-400 font-medium">Записей пока нет</div>
        ) : (
          bookings.map((b) => (
            <div key={b.id} className="bg-white rounded-2xl p-5 shadow-sm border border-zinc-200">
              <div className="flex justify-between items-start mb-3 border-b border-zinc-100 pb-3">
                <h3 className="font-bold text-lg text-zinc-900">{b.client_name}</h3>
                <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full">
                  {b.status}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm text-zinc-600 flex items-center gap-2 font-medium">
                  <Phone className="h-4 w-4 text-zinc-400" />
                  <a href={`tel:${b.client_phone}`} className="text-blue-600 underline">
                    {b.client_phone}
                  </a>
                </p>
                <p className="text-sm text-zinc-600 flex items-center gap-2 font-medium">
                  <Clock className="h-4 w-4 text-zinc-400" />
                  {format(new Date(b.created_at), 'd MMMM, HH:mm', { locale: ru })}
                </p>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-green-500 text-white py-2 rounded-xl text-sm font-bold active:scale-95 transition">
                  Принять
                </button>
                <button className="flex-1 bg-zinc-100 text-zinc-600 py-2 rounded-xl text-sm font-bold active:scale-95 transition">
                  Отменить
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}