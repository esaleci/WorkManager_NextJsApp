
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      clients: {
        Row: {
          avatar: string | null
          created_at: string
          id: number
          is_del: boolean | null
          name: string | null
          position: string | null
          userId: string | null
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          id?: number
          is_del?: boolean | null
          name?: string | null
          position?: string | null
          userId?: string | null
        }
        Update: {
          avatar?: string | null
          created_at?: string
          id?: number
          is_del?: boolean | null
          name?: string | null
          position?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clients_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          created_at: string
          id: number
          planExplain: string | null
          planName: string | null
          planPrice: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          planExplain?: string | null
          planName?: string | null
          planPrice?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          planExplain?: string | null
          planName?: string | null
          planPrice?: number | null
        }
        Relationships: []
      }
      projectClients: {
        Row: {
          clientId: number | null
          created_at: string
          id: number
          projectId: string | null
        }
        Insert: {
          clientId?: number | null
          created_at?: string
          id?: number
          projectId?: string | null
        }
        Update: {
          clientId?: number | null
          created_at?: string
          id?: number
          projectId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projectClients_clientId_fkey"
            columns: ["clientId"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projectClients_projectId_fkey"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          clients: number[] | null
          created_at: string
          description: string | null
          endDate: string | null
          id: string
          is_del: boolean | null
          limitTask: number | null
          paidAmount: number | null
          priority: number | null
          startDate: string | null
          status: number | null
          title: string | null
          totalPrice: number | null
          userId: string | null
          workSpace: number | null
        }
        Insert: {
          clients?: number[] | null
          created_at?: string
          description?: string | null
          endDate?: string | null
          id?: string
          is_del?: boolean | null
          limitTask?: number | null
          paidAmount?: number | null
          priority?: number | null
          startDate?: string | null
          status?: number | null
          title?: string | null
          totalPrice?: number | null
          userId?: string | null
          workSpace?: number | null
        }
        Update: {
          clients?: number[] | null
          created_at?: string
          description?: string | null
          endDate?: string | null
          id?: string
          is_del?: boolean | null
          limitTask?: number | null
          paidAmount?: number | null
          priority?: number | null
          startDate?: string | null
          status?: number | null
          title?: string | null
          totalPrice?: number | null
          userId?: string | null
          workSpace?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_workSpace_fkey"
            columns: ["workSpace"]
            isOneToOne: false
            referencedRelation: "workspace"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          attachments: Json | null
          clients: number[] | null
          created_at: string
          description: string | null
          endDate: string | null
          id: number
          is_del: boolean | null
          paidAmount: number | null
          priority: number | null
          projectId: string | null
          startDate: string | null
          status: number | null
          title: string | null
          userId: string | null
        }
        Insert: {
          attachments?: Json | null
          clients?: number[] | null
          created_at?: string
          description?: string | null
          endDate?: string | null
          id?: number
          is_del?: boolean | null
          paidAmount?: number | null
          priority?: number | null
          projectId?: string | null
          startDate?: string | null
          status?: number | null
          title?: string | null
          userId?: string | null
        }
        Update: {
          attachments?: Json | null
          clients?: number[] | null
          created_at?: string
          description?: string | null
          endDate?: string | null
          id?: number
          is_del?: boolean | null
          paidAmount?: number | null
          priority?: number | null
          projectId?: string | null
          startDate?: string | null
          status?: number | null
          title?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_projectId_fkey"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar: string | null
          created_at: string
          email: string | null
          id: string
          is_subscribed: boolean
          mobile: string | null
          plan_id: number | null
          subscription_expires: string | null
          username: string | null
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_subscribed?: boolean
          mobile?: string | null
          plan_id?: number | null
          subscription_expires?: string | null
          username?: string | null
        }
        Update: {
          avatar?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_subscribed?: boolean
          mobile?: string | null
          plan_id?: number | null
          subscription_expires?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace: {
        Row: {
          created_at: string
          id: number
          is_del: boolean | null
          title: string | null
          userId: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          is_del?: boolean | null
          title?: string | null
          userId?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          is_del?: boolean | null
          title?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workspace_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_projects: {
        Args: Record<PropertyKey, never>
        Returns: {
          clients: number[] | null
          created_at: string
          description: string | null
          endDate: string | null
          id: string
          is_del: boolean | null
          limitTask: number | null
          paidAmount: number | null
          priority: number | null
          startDate: string | null
          status: number | null
          title: string | null
          totalPrice: number | null
          userId: string | null
          workSpace: number | null
        }[]
      }
      get_projectsviaclients: {
        Args: Record<PropertyKey, never>
        Returns: {
          projid: string
          id: number
          name: string
          avatar: string
        }[]
      }
      get_tasksprojects: {
        Args: { prgid: string }
        Returns: {
          status: number
          count: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
