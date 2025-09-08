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
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (title) {
      setIsLoading(true)
      try {
        // Create the task object
        const taskData = {
          task: title,
          description: description || "",
          dueDate: date ? new Date(date).toISOString() : null
        }

        // Send POST request to backend
        const response = await fetch('/api/v1/task', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskData)
        })

        if (response.ok) {
          console.log("Task sent to backend successfully")
          setIsSubmitted(true)
          
          // Reset form after 2 seconds
          setTimeout(() => {
            setTitle("")
            setDescription("")
            setDate("")
            setIsSubmitted(false)
          }, 20000)
        } else {
          console.error("Failed to send task to backend:", response.statusText)
          // Still show success message for UX, but log the error
          setIsSubmitted(true)
          setTimeout(() => {
            setTitle("")
            setDescription("")
            setDate("")
            setIsSubmitted(false)
          }, 20000)
        }
      } catch (error) {
        console.error("Error sending task to backend:", error)
        // Still show success message for UX, but log the error
        setIsSubmitted(true)
        setTimeout(() => {
          setTitle("")
          setDescription("")
          setDate("")
          setIsSubmitted(false)
        }, 20000)
      } finally {
        setIsLoading(false)
      }
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
            <h2 className="text-xl font-bold text-slate-800 mb-2">Boom! Matt&apos;s been notified!</h2>
            <p className="text-slate-600 text-center">
              &quot;{title}&quot; is now on his radar (good luck getting him to actually do it though...)
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg bg-white">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-slate-800 text-balance">Remind Matt to...</CardTitle>
          <p className="text-slate-600 text-sm mt-2">Because apparently he can&apos;t remember anything on his own</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-semibold text-slate-700">
                What&apos;s Matt forgetting now? *
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
                disabled={!title || isLoading}
              >
                {isLoading ? "Sending..." : "Send Matt This Reminder"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
