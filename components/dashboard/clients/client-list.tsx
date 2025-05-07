"use client"

import { useState } from "react"
import { Client } from "@/utils/supabase/types"
import { ClientCard } from "./client-card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ClientForm } from "./client-form"
import { ClientDropdown } from "./client-dropdown"
import { motion, AnimatePresence } from "framer-motion"
import { PlusCircle } from "lucide-react"

interface ClientListProps {
  initialClients: Client[]
}

export function ClientList({ initialClients }: ClientListProps) {
  const [clients, setClients] = useState<Client[]>(initialClients)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleAddClient = (newClient: Client) => {
    setClients((prev) => [newClient, ...prev])
    setDialogOpen(false)
  }

  const handleDeleteClient = (id: string) => {
    setClients((prev) => prev.filter((client) => client.id !== id))
    if (selectedClient?.id === id) {
      setSelectedClient(null)
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        <ClientDropdown
          clients={clients}
          onSelect={setSelectedClient}
          onAddClient={handleAddClient}
          selectedClient={selectedClient}
          placeholder="Search or select client"
        />

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex-shrink-0">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Client
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold tracking-tight">Add New Client</h2>
                <p className="text-sm text-muted-foreground">
                  Fill in the details to add a new client to your list.
                </p>
              </div>
              <ClientForm 
                onAddClient={handleAddClient} 
                onCancel={() => setDialogOpen(false)}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <h2 className="mb-6 text-xl font-semibold tracking-tight">Clients</h2>
        <AnimatePresence>
          <motion.div 
            layout
            className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {clients.map((client) => (
              <ClientCard 
                key={client.id} 
                client={client} 
                onDelete={handleDeleteClient}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}