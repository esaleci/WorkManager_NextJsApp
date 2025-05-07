"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState, useRef } from "react"
import { Client } from "@/utils/supabase/types"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import Image from "next/image"
import { ImageIcon, Loader2, Upload } from "lucide-react"
import { CretaeClient, UploadImage } from "@/app/api/clients/route"
import { toast } from "@/components/hooks/use-toast"



interface initialState  {
  message: string
  type: string,
  success: false,
  data:any
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  position: z.string().min(2, {
    message: "Position must be at least 2 characters.",
  }),
  id:z.number().optional(),
  is_del:z.boolean()
})

interface ClientFormProps {
  onAddClient: (client: Client) => void
  onCancel?: () => void
}

export function ClientForm({ onAddClient, onCancel }: ClientFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      position: "",
      id:0,
      is_del:false
    },
  })

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.size > MAX_FILE_SIZE) {
      alert("File size must be less than 5MB")
      return
    }

    setSelectedFile(file)
    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)
  }

  

  const uploadPhoto = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop()
    // const fileName = `${uuidv4()}.${fileExt}`
    // const filePath = `clients/${fileName}`

    // const { error: uploadError } = await supabase.storage
    //   .from('client-photos')
    //   .upload(filePath, file)

  //   if (uploadError) {
  //     throw new Error('Error uploading file')
  //   }

  //   const { data: { publicUrl } } = supabase.storage
  //     .from('client-photos')
  //     .getPublicUrl(filePath)
  //return ''//publicUrl
  // const formData = await request.formData();
  // const file = formData.get('file') as Blob;

  // if (!file) {
  //   return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  // }

  
   const getImage= await UploadImage(file)

   if(getImage.success){
      return getImage.data||''
   }
    else{
      toast({
        title: "Error",
        description:`Failed to upload Image .. Please try again.`+getImage.message ,
        variant: "destructive",
      });
    }
  
   return ''
  
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true)

      let photoUrl = ''
      if (selectedFile) {
        photoUrl = await uploadPhoto(selectedFile)
      }

      const newClient: Client = {
        id: 0,
        is_del:false,
        name: values.name,
        position: values.position,
        avatar: photoUrl || 'https://via.placeholder.com/400',
      }

      console.log('clients is',newClient)

      let savedData:initialState;
              if(form.getValues().id||0 > 0){
                // savedData = await UpdateProject(values);
                savedData=await CretaeClient(newClient);
              }else{
                // savedData = await CretaeProject(values);
                savedData=await CretaeClient(newClient);
              }
              console.log('suu',savedData)
              if(savedData.success){
                    toast({
                  title: `Client ${values.id||0 >0 ? 'edited' : 'created'}`,
                  description: `The client has been ${values.id||0 >0 ? 'edited' : 'created'} successfully.`,
                });
                onAddClient(savedData.data)
                form.reset()
                setSelectedFile(null)
                setPreviewUrl(null)
              }else{
                   toast({
                  title: "Error",
                  description:`Failed to ${values.id||0 >0 ? 'edited' : 'created'} client .. Please try again.` ,
                  variant: "destructive",
                });
              }
     
    } catch (error) {
      console.error('Error adding client:', error)
      alert('Error adding client. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input placeholder="Marketing Manager" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-4">
              <FormLabel>Photo</FormLabel>
              <div className="mt-1">
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Photo
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative flex h-48 w-full items-center justify-center overflow-hidden rounded-md border bg-muted">
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Preview"
                  fill
                  className="object-cover"
                  onError={() => setPreviewUrl(null)}
                />
              ) : (
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          {onCancel && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add Client"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}