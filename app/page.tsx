'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { CheckCircle2, Calendar, Clock, Sparkles } from 'lucide-react'

export default function ClientPage() {
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    const { error } = await supabase.from('bookings').insert([{ 
      client_name: name, 
      client_phone: phone,
      service_name: 'Комплексная услуга'
    }])

    setIsLoading(false)
    if (!error) setIsSuccess(true)
    else alert('Ошибка сети, попробуйте еще раз')
  }

  if (isSuccess) return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 text-center shadow-xl">
        <CheckCircle2 className="mx-auto h-20 w-20 text-emerald-500 mb-6" />
        <h2 className="text-3xl font-bold text-zinc-900">Ждем вас!</h2>
        <p className="mt-4 text-zinc-500 text-lg">Заявка получена. Мы позвоним в течение 5 минут.</p>
        <button onClick={() => setIsSuccess(false)} className="mt-8 w-full rounded-2xl bg-zinc-900 py-4 font-bold text-white">
          Вернуться
        </button>
      </div>
    </div>
  )

  return (
    <main className="mx-auto max-w-md min-h-screen bg-white shadow-2xl relative overflow-hidden">
      <div className="bg-zinc-900 p-8 pb-12 text-white rounded-b-[3rem] relative z-10">
        <h1 className="text-4xl font-black tracking-tight">STUDIO</h1>
        <p className="text-zinc-400 mt-2 flex items-center gap-2 font-medium">
          <Sparkles className="h-4 w-4 text-amber-400" /> Premium Service
        </p>
      </div>

      <div className="px-6 -mt-6 relative z-20">
        <div className="rounded-3xl bg-white p-6 shadow-xl border border-zinc-100">
          <div className="border-b border-zinc-100 pb-5 mb-5">
            <h2 className="text-xl font-bold text-zinc-900">Запись на визит</h2>
            <div className="flex gap-4 mt-3 text-sm text-zinc-500 font-medium">
              <span className="flex items-center gap-1"><Clock className="h-4 w-4"/> ~1 час</span>
              <span className="text-zinc-900">от 1 500 ₽</span>
            </div>
          </div>
          
          <form onSubmit={handleBooking} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-2">Ваше имя</label>
              <input type="text" required value={name} onChange={e => setName(e.target.value)}
                className="w-full rounded-2xl bg-zinc-50 border-0 px-5 py-4 text-zinc-900 ring-1 ring-inset ring-zinc-200 focus:ring-2 focus:ring-inset focus:ring-zinc-900" placeholder="Анна" />
            </div>
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-2">Телефон</label>
              <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)}
                className="w-full rounded-2xl bg-zinc-50 border-0 px-5 py-4 text-zinc-900 ring-1 ring-inset ring-zinc-200 focus:ring-2 focus:ring-inset focus:ring-zinc-900" placeholder="+7 (999) 000-00-00" />
            </div>
            <button type="submit" disabled={isLoading} className="w-full mt-4 rounded-2xl bg-zinc-900 py-4 font-bold text-white shadow-lg active:scale-95 transition-transform flex justify-center items-center gap-2">
              {isLoading ? 'Отправка...' : <><Calendar className="h-5 w-5"/> Записаться</>}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}