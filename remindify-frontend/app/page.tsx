"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, CheckIcon } from "lucide-react"

export default function ReminderPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title) {
      setIsSubmitted(true)
      // Here you would typically save the reminder to a database
      console.log("Reminder created:", { title, description, date })

      // Reset form after 2 seconds
      setTimeout(() => {
        setTitle("")
        setDescription("")
        setDate("")
        setIsSubmitted(false)
      }, 2000)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
              <CheckIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Boom! Matt's been notified!</h2>
            <p className="text-slate-600 text-center">
              "{title}" is now on his radar (good luck getting him to actually do it though...)
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-slate-800 text-balance">Remind Matt to...</CardTitle>
          <p className="text-slate-600 text-sm mt-2">Because apparently he can't remember anything on his own</p>
        </CardHeader>
        <CardContent className="bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-semibold text-slate-700">
                What's Matt forgetting now? *
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Take out the trash, call mom, exist..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-semibold text-slate-700">
                Extra nagging details
              </Label>
              <Textarea
                id="description"
                placeholder="Add some guilt-inducing context here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full min-h-[100px] resize-none"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-semibold text-slate-700">
                When should Matt panic?
              </Label>
              <div className="relative">
                <Input
                  id="date"
                  type="datetime-local"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pr-10"
                />
                <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
                disabled={!title}
              >
                Send Matt This Reminder
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
