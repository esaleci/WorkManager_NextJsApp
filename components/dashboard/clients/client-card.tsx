"use client"

import { Client } from "@/utils/supabase/types"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface ClientCardProps {
  client: Client
  onDelete?: (id: string) => void
  className?: string
}

export function ClientCard({ client, onDelete, className }: ClientCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={cn("group", className)}
    >
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
        <CardContent className="p-0">
          <div className="relative">
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={client.photoUrl}
                alt={client.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
            {onDelete && (
              <Button
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                onClick={() => onDelete(client.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-medium text-foreground">{client.name}</h3>
            <p className="text-sm text-muted-foreground">{client.position}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}