export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      "AUDIO-AULA": {
        Row: {
          area: string | null
          descricao: string | null
          id: number
          imagem_miniatura: string | null
          sequencia: number | null
          tag: string | null
          tema: string | null
          titulo: string | null
          url_audio: string | null
        }
        Insert: {
          area?: string | null
          descricao?: string | null
          id: number
          imagem_miniatura?: string | null
          sequencia?: number | null
          tag?: string | null
          tema?: string | null
          titulo?: string | null
          url_audio?: string | null
        }
        Update: {
          area?: string | null
          descricao?: string | null
          id?: number
          imagem_miniatura?: string | null
          sequencia?: number | null
          tag?: string | null
          tema?: string | null
          titulo?: string | null
          url_audio?: string | null
        }
        Relationships: []
      }
      "BIBILIOTECA-OAB": {
        Row: {
          Área: string | null
          aula: string | null
          "Capa-area": string | null
          "Capa-livro": string | null
          Download: string | null
          id: number
          Link: string | null
          Ordem: number | null
          Sobre: string | null
          Tema: string | null
        }
        Insert: {
          Área?: string | null
          aula?: string | null
          "Capa-area"?: string | null
          "Capa-livro"?: string | null
          Download?: string | null
          id: number
          Link?: string | null
          Ordem?: number | null
          Sobre?: string | null
          Tema?: string | null
        }
        Update: {
          Área?: string | null
          aula?: string | null
          "Capa-area"?: string | null
          "Capa-livro"?: string | null
          Download?: string | null
          id?: number
          Link?: string | null
          Ordem?: number | null
          Sobre?: string | null
          Tema?: string | null
        }
        Relationships: []
      }
      "BIBLIOTECA-CLASSICOS": {
        Row: {
          area: string | null
          aula: string | null
          autor: string | null
          beneficios: string | null
          "Capa-area": string | null
          download: string | null
          id: number
          imagem: string | null
          link: string | null
          livro: string | null
          sobre: string | null
        }
        Insert: {
          area?: string | null
          aula?: string | null
          autor?: string | null
          beneficios?: string | null
          "Capa-area"?: string | null
          download?: string | null
          id: number
          imagem?: string | null
          link?: string | null
          livro?: string | null
          sobre?: string | null
        }
        Update: {
          area?: string | null
          aula?: string | null
          autor?: string | null
          beneficios?: string | null
          "Capa-area"?: string | null
          download?: string | null
          id?: number
          imagem?: string | null
          link?: string | null
          livro?: string | null
          sobre?: string | null
        }
        Relationships: []
      }
      "BIBLIOTECA-ESTUDOS": {
        Row: {
          Área: string | null
          aula: string | null
          "Capa-area": string | null
          "Capa-livro": string | null
          Download: string | null
          id: number | null
          Link: string | null
          Ordem: number | null
          Sobre: string | null
          Tema: string | null
        }
        Insert: {
          Área?: string | null
          aula?: string | null
          "Capa-area"?: string | null
          "Capa-livro"?: string | null
          Download?: string | null
          id?: number | null
          Link?: string | null
          Ordem?: number | null
          Sobre?: string | null
          Tema?: string | null
        }
        Update: {
          Área?: string | null
          aula?: string | null
          "Capa-area"?: string | null
          "Capa-livro"?: string | null
          Download?: string | null
          id?: number | null
          Link?: string | null
          Ordem?: number | null
          Sobre?: string | null
          Tema?: string | null
        }
        Relationships: []
      }
      "BIBLIOTECA-FORA-DA-TOGA": {
        Row: {
          area: string | null
          aula: string | null
          autor: string | null
          "capa-area": string | null
          "capa-livro": string | null
          download: string | null
          id: number
          link: string | null
          livro: string | null
          sobre: string | null
        }
        Insert: {
          area?: string | null
          aula?: string | null
          autor?: string | null
          "capa-area"?: string | null
          "capa-livro"?: string | null
          download?: string | null
          id: number
          link?: string | null
          livro?: string | null
          sobre?: string | null
        }
        Update: {
          area?: string | null
          aula?: string | null
          autor?: string | null
          "capa-area"?: string | null
          "capa-livro"?: string | null
          download?: string | null
          id?: number
          link?: string | null
          livro?: string | null
          sobre?: string | null
        }
        Relationships: []
      }
      "BIBLIOTECA-LIDERANÇA": {
        Row: {
          area: string | null
          aula: string | null
          autor: string | null
          beneficios: string | null
          "Capa-area": string | null
          download: string | null
          id: number
          imagem: string | null
          link: string | null
          livro: string | null
          sobre: string | null
        }
        Insert: {
          area?: string | null
          aula?: string | null
          autor?: string | null
          beneficios?: string | null
          "Capa-area"?: string | null
          download?: string | null
          id: number
          imagem?: string | null
          link?: string | null
          livro?: string | null
          sobre?: string | null
        }
        Update: {
          area?: string | null
          aula?: string | null
          autor?: string | null
          beneficios?: string | null
          "Capa-area"?: string | null
          download?: string | null
          id?: number
          imagem?: string | null
          link?: string | null
          livro?: string | null
          sobre?: string | null
        }
        Relationships: []
      }
      "BIBLIOTECA-ORATORIA": {
        Row: {
          area: string | null
          aula: string | null
          autor: string | null
          beneficios: string | null
          "Capa-area": string | null
          download: string | null
          id: number
          imagem: string | null
          link: string | null
          livro: string | null
          sobre: string | null
        }
        Insert: {
          area?: string | null
          aula?: string | null
          autor?: string | null
          beneficios?: string | null
          "Capa-area"?: string | null
          download?: string | null
          id: number
          imagem?: string | null
          link?: string | null
          livro?: string | null
          sobre?: string | null
        }
        Update: {
          area?: string | null
          aula?: string | null
          autor?: string | null
          beneficios?: string | null
          "Capa-area"?: string | null
          download?: string | null
          id?: number
          imagem?: string | null
          link?: string | null
          livro?: string | null
          sobre?: string | null
        }
        Relationships: []
      }
      "CA - Código de Águas": {
        Row: {
          Artigo: string | null
          Aula: string | null
          Comentario: string | null
          exemplo: string | null
          explicacao_resumido: string | null
          explicacao_simples_maior16: string | null
          explicacao_simples_menor16: string | null
          explicacao_tecnico: string | null
          flashcards: Json | null
          id: number
          Narração: string | null
          "Número do Artigo": string | null
          questoes: Json | null
          termos: Json | null
          termos_aprofundados: Json | null
          ultima_atualizacao: string | null
          versao_conteudo: number | null
        }
        Insert: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Update: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id?: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Relationships: []
      }
      cache_camara_deputados: {
        Row: {
          chave_cache: string
          created_at: string | null
          dados: Json
          expira_em: string | null
          id: number
          tipo_cache: string
          total_registros: number | null
          updated_at: string | null
          versao: number | null
        }
        Insert: {
          chave_cache: string
          created_at?: string | null
          dados: Json
          expira_em?: string | null
          id?: number
          tipo_cache: string
          total_registros?: number | null
          updated_at?: string | null
          versao?: number | null
        }
        Update: {
          chave_cache?: string
          created_at?: string | null
          dados?: Json
          expira_em?: string | null
          id?: number
          tipo_cache?: string
          total_registros?: number | null
          updated_at?: string | null
          versao?: number | null
        }
        Relationships: []
      }
      cache_pesquisas: {
        Row: {
          created_at: string
          id: number
          resultados: Json
          termo_pesquisado: string
          total_resultados: number
          updated_at: string
          versao: number
        }
        Insert: {
          created_at?: string
          id?: never
          resultados?: Json
          termo_pesquisado: string
          total_resultados?: number
          updated_at?: string
          versao?: number
        }
        Update: {
          created_at?: string
          id?: never
          resultados?: Json
          termo_pesquisado?: string
          total_resultados?: number
          updated_at?: string
          versao?: number
        }
        Relationships: []
      }
      "CAPA-BIBILIOTECA": {
        Row: {
          Biblioteca: string | null
          capa: string | null
          id: number
        }
        Insert: {
          Biblioteca?: string | null
          capa?: string | null
          id: number
        }
        Update: {
          Biblioteca?: string | null
          capa?: string | null
          id?: number
        }
        Relationships: []
      }
      "CBA Código Brasileiro de Aeronáutica": {
        Row: {
          Artigo: string | null
          Aula: string | null
          Comentario: string | null
          exemplo: string | null
          explicacao_resumido: string | null
          explicacao_simples_maior16: string | null
          explicacao_simples_menor16: string | null
          explicacao_tecnico: string | null
          flashcards: Json | null
          id: number
          Narração: string | null
          "Número do Artigo": string | null
          questoes: Json | null
          termos: Json | null
          termos_aprofundados: Json | null
          ultima_atualizacao: string | null
          versao_conteudo: number | null
        }
        Insert: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Update: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id?: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Relationships: []
      }
      "CBT Código Brasileiro de Telecomunicações": {
        Row: {
          Artigo: string | null
          Aula: string | null
          Comentario: string | null
          exemplo: string | null
          explicacao_resumido: string | null
          explicacao_simples_maior16: string | null
          explicacao_simples_menor16: string | null
          explicacao_tecnico: string | null
          flashcards: Json | null
          id: number
          Narração: string | null
          "Número do Artigo": string | null
          questoes: Json | null
          termos: Json | null
          ultima_atualizacao: string | null
          versao_conteudo: number | null
        }
        Insert: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Update: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id?: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Relationships: []
      }
      "CC - Código Civil": {
        Row: {
          Artigo: string | null
          Aula: string | null
          Comentario: string | null
          exemplo: string | null
          explicacao_resumido: string | null
          explicacao_simples_maior16: string | null
          explicacao_simples_menor16: string | null
          explicacao_tecnico: string | null
          flashcards: Json | null
          id: number
          Narração: string | null
          "Número do Artigo": string | null
          questoes: Json | null
          termos: Json | null
          termos_aprofundados: Json | null
          ultima_atualizacao: string | null
          versao_conteudo: number | null
        }
        Insert: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Update: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id?: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Relationships: []
      }
      "CCOM – Código Comercial": {
        Row: {
          Artigo: string | null
          Aula: string | null
          Comentario: string | null
          exemplo: string | null
          explicacao_resumido: string | null
          explicacao_simples_maior16: string | null
          explicacao_simples_menor16: string | null
          explicacao_tecnico: string | null
          flashcards: Json | null
          id: number
          Narração: string | null
          "Número do Artigo": string | null
          questoes: Json | null
          termos: Json | null
          termos_aprofundados: Json | null
          ultima_atualizacao: string | null
          versao_conteudo: number | null
        }
        Insert: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Update: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id?: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Relationships: []
      }
      "CDC – Código de Defesa do Consumidor": {
        Row: {
          Artigo: string | null
          Aula: string | null
          Comentario: string | null
          exemplo: string | null
          explicacao_resumido: string | null
          explicacao_simples_maior16: string | null
          explicacao_simples_menor16: string | null
          explicacao_tecnico: string | null
          flashcards: Json | null
          id: number
          Narração: string | null
          "Número do Artigo": string | null
          questoes: Json | null
          termos: Json | null
          termos_aprofundados: Json | null
          ultima_atualizacao: string | null
          versao_conteudo: number | null
        }
        Insert: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Update: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id?: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Relationships: []
      }
      "CDM – Código de Minas": {
        Row: {
          Artigo: string | null
          Aula: string | null
          Comentario: string | null
          exemplo: string | null
          explicacao_resumido: string | null
          explicacao_simples_maior16: string | null
          explicacao_simples_menor16: string | null
          explicacao_tecnico: string | null
          flashcards: Json | null
          id: number
          Narração: string | null
          "Número do Artigo": string | null
          questoes: Json | null
          termos: Json | null
          termos_aprofundados: Json | null
          ultima_atualizacao: string | null
          versao_conteudo: number | null
        }
        Insert: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Update: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id?: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Relationships: []
      }
      "CE – Código Eleitoral": {
        Row: {
          Artigo: string | null
          Aula: string | null
          Comentario: string | null
          exemplo: string | null
          explicacao_resumido: string | null
          explicacao_simples_maior16: string | null
          explicacao_simples_menor16: string | null
          explicacao_tecnico: string | null
          flashcards: Json | null
          id: number
          Narração: string | null
          "Número do Artigo": string | null
          questoes: Json | null
          termos: Json | null
          termos_aprofundados: Json | null
          ultima_atualizacao: string | null
          versao_conteudo: number | null
        }
        Insert: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Update: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id?: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Relationships: []
      }
      "CF - Constituição Federal": {
        Row: {
          Artigo: string | null
          Aula: string | null
          Comentario: string | null
          exemplo: string | null
          explicacao_resumido: string | null
          explicacao_simples_maior16: string | null
          explicacao_simples_menor16: string | null
          explicacao_tecnico: string | null
          flashcards: Json | null
          id: number
          Narração: string | null
          "Número do Artigo": string | null
          questoes: Json | null
          termos: Json | null
          termos_aprofundados: Json | null
          ultima_atualizacao: string | null
          versao_conteudo: number | null
        }
        Insert: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id?: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Update: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id?: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Relationships: []
      }
      "CLT – Consolidação das Leis do Trabalho": {
        Row: {
          Artigo: string | null
          Aula: string | null
          Comentario: string | null
          exemplo: string | null
          explicacao_resumido: string | null
          explicacao_simples_maior16: string | null
          explicacao_simples_menor16: string | null
          explicacao_tecnico: string | null
          flashcards: Json | null
          id: number
          Narração: string | null
          "Número do Artigo": string | null
          questoes: Json | null
          termos: Json | null
          termos_aprofundados: Json | null
          ultima_atualizacao: string | null
          versao_conteudo: number | null
        }
        Insert: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Update: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id?: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Relationships: []
      }
      "CP - Código Penal": {
        Row: {
          Artigo: string | null
          Aula: string | null
          Comentario: string | null
          exemplo: string | null
          explicacao_resumido: string | null
          explicacao_simples_maior16: string | null
          explicacao_simples_menor16: string | null
          explicacao_tecnico: string | null
          flashcards: Json | null
          id: number
          Narração: string | null
          "Número do Artigo": string | null
          questoes: Json | null
          termos: Json | null
          termos_aprofundados: Json | null
          ultima_atualizacao: string | null
          versao_conteudo: number | null
        }
        Insert: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id?: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Update: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id?: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Relationships: []
      }
      "CPC – Código de Processo Civil": {
        Row: {
          Artigo: string | null
          Aula: string | null
          Comentario: string | null
          exemplo: string | null
          explicacao_resumido: string | null
          explicacao_simples_maior16: string | null
          explicacao_simples_menor16: string | null
          explicacao_tecnico: string | null
          flashcards: Json | null
          id: number
          Narração: string | null
          "Número do Artigo": string | null
          questoes: Json | null
          termos: Json | null
          termos_aprofundados: Json | null
          ultima_atualizacao: string | null
          versao_conteudo: number | null
        }
        Insert: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Update: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id?: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Relationships: []
      }
      "CPP – Código de Processo Penal": {
        Row: {
          Artigo: string | null
          Aula: string | null
          Comentario: string | null
          exemplo: string | null
          explicacao_resumido: string | null
          explicacao_simples_maior16: string | null
          explicacao_simples_menor16: string | null
          explicacao_tecnico: string | null
          flashcards: Json | null
          id: number
          Narração: string | null
          "Número do Artigo": string | null
          questoes: Json | null
          termos: Json | null
          termos_aprofundados: Json | null
          ultima_atualizacao: string | null
          versao_conteudo: number | null
        }
        Insert: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Update: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id?: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Relationships: []
      }
      "CTB Código de Trânsito Brasileiro": {
        Row: {
          Artigo: string | null
          Aula: string | null
          Comentario: string | null
          exemplo: string | null
          explicacao_resumido: string | null
          explicacao_simples_maior16: string | null
          explicacao_simples_menor16: string | null
          explicacao_tecnico: string | null
          flashcards: Json | null
          id: number
          Narração: string | null
          "Número do Artigo": string | null
          questoes: Json | null
          termos: Json | null
          termos_aprofundados: Json | null
          ultima_atualizacao: string | null
          versao_conteudo: number | null
        }
        Insert: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Update: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id?: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Relationships: []
      }
      "CTN – Código Tributário Nacional": {
        Row: {
          Artigo: string | null
          Aula: string | null
          Comentario: string | null
          exemplo: string | null
          explicacao_resumido: string | null
          explicacao_simples_maior16: string | null
          explicacao_simples_menor16: string | null
          explicacao_tecnico: string | null
          flashcards: Json | null
          id: number
          Narração: string | null
          "Número do Artigo": string | null
          questoes: Json | null
          termos: Json | null
          termos_aprofundados: Json | null
          ultima_atualizacao: string | null
          versao_conteudo: number | null
        }
        Insert: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Update: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id?: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Relationships: []
      }
      CURSOS: {
        Row: {
          Area: string | null
          Assunto: string | null
          Aula: number | null
          capa: string | null
          "capa-area": string | null
          "capa-modulo": string | null
          conteudo: string | null
          id: number
          material: string | null
          Modulo: number | null
          Tema: string | null
          video: string | null
        }
        Insert: {
          Area?: string | null
          Assunto?: string | null
          Aula?: number | null
          capa?: string | null
          "capa-area"?: string | null
          "capa-modulo"?: string | null
          conteudo?: string | null
          id: number
          material?: string | null
          Modulo?: number | null
          Tema?: string | null
          video?: string | null
        }
        Update: {
          Area?: string | null
          Assunto?: string | null
          Aula?: number | null
          capa?: string | null
          "capa-area"?: string | null
          "capa-modulo"?: string | null
          conteudo?: string | null
          id?: number
          material?: string | null
          Modulo?: number | null
          Tema?: string | null
          video?: string | null
        }
        Relationships: []
      }
      cursos_flashcards: {
        Row: {
          content_hash: string
          created_at: string | null
          curso_id: number
          flashcards_json: Json
          id: string
        }
        Insert: {
          content_hash: string
          created_at?: string | null
          curso_id: number
          flashcards_json: Json
          id?: string
        }
        Update: {
          content_hash?: string
          created_at?: string | null
          curso_id?: number
          flashcards_json?: Json
          id?: string
        }
        Relationships: []
      }
      cursos_questoes: {
        Row: {
          content_hash: string
          created_at: string | null
          curso_id: number
          id: string
          questoes_json: Json
        }
        Insert: {
          content_hash: string
          created_at?: string | null
          curso_id: number
          id?: string
          questoes_json: Json
        }
        Update: {
          content_hash?: string
          created_at?: string | null
          curso_id?: number
          id?: string
          questoes_json?: Json
        }
        Relationships: []
      }
      DICIONARIO: {
        Row: {
          "Exemplo de Uso 1": string | null
          "Exemplo de Uso 2": string | null
          Letra: string | null
          Palavra: string | null
          Significado: string | null
        }
        Insert: {
          "Exemplo de Uso 1"?: string | null
          "Exemplo de Uso 2"?: string | null
          Letra?: string | null
          Palavra?: string | null
          Significado?: string | null
        }
        Update: {
          "Exemplo de Uso 1"?: string | null
          "Exemplo de Uso 2"?: string | null
          Letra?: string | null
          Palavra?: string | null
          Significado?: string | null
        }
        Relationships: []
      }
      "ESTATUTO - CIDADE": {
        Row: {
          Artigo: string | null
          Aula: string | null
          Comentario: string | null
          exemplo: string | null
          explicacao_resumido: string | null
          explicacao_simples_maior16: string | null
          explicacao_simples_menor16: string | null
          explicacao_tecnico: string | null
          flashcards: Json | null
          id: number
          Narração: string | null
          "Número do Artigo": string | null
          questoes: Json | null
          termos: Json | null
          termos_aprofundados: Json | null
          ultima_atualizacao: string | null
          versao_conteudo: number | null
        }
        Insert: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Update: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id?: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Relationships: []
      }
      "ESTATUTO - DESARMAMENTO": {
        Row: {
          Artigo: string | null
          Aula: string | null
          Comentario: string | null
          exemplo: string | null
          explicacao_resumido: string | null
          explicacao_simples_maior16: string | null
          explicacao_simples_menor16: string | null
          explicacao_tecnico: string | null
          flashcards: Json | null
          id: number
          Narração: string | null
          "Número do Artigo": string | null
          questoes: Json | null
          termos: Json | null
          ultima_atualizacao: string | null
          versao_conteudo: number | null
        }
        Insert: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Update: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id?: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Relationships: []
      }
      "ESTATUTO - ECA": {
        Row: {
          Artigo: string | null
          Aula: string | null
          Comentario: string | null
          exemplo: string | null
          explicacao_resumido: string | null
          explicacao_simples_maior16: string | null
          explicacao_simples_menor16: string | null
          explicacao_tecnico: string | null
          flashcards: Json | null
          id: number
          Narração: string | null
          "Número do Artigo": string | null
          questoes: Json | null
          termos: Json | null
          termos_aprofundados: Json | null
          ultima_atualizacao: string | null
          versao_conteudo: number | null
        }
        Insert: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Update: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id?: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Relationships: []
      }
      "ESTATUTO - IDOSO": {
        Row: {
          Artigo: string | null
          Aula: string | null
          Comentario: string | null
          exemplo: string | null
          explicacao_resumido: string | null
          explicacao_simples_maior16: string | null
          explicacao_simples_menor16: string | null
          explicacao_tecnico: string | null
          flashcards: Json | null
          id: number
          Narração: string | null
          "Número do Artigo": string | null
          questoes: Json | null
          termos: Json | null
          termos_aprofundados: Json | null
          ultima_atualizacao: string | null
          versao_conteudo: number | null
        }
        Insert: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Update: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id?: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Relationships: []
      }
      "ESTATUTO - IGUALDADE RACIAL": {
        Row: {
          Artigo: string | null
          Aula: string | null
          Comentario: string | null
          exemplo: string | null
          explicacao_resumido: string | null
          explicacao_simples_maior16: string | null
          explicacao_simples_menor16: string | null
          explicacao_tecnico: string | null
          flashcards: Json | null
          id: number
          Narração: string | null
          "Número do Artigo": string | null
          questoes: Json | null
          termos: Json | null
          termos_aprofundados: Json | null
          ultima_atualizacao: string | null
          versao_conteudo: number | null
        }
        Insert: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Update: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id?: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Relationships: []
      }
      "ESTATUTO - OAB": {
        Row: {
          Artigo: string | null
          Aula: string | null
          Comentario: string | null
          exemplo: string | null
          explicacao_resumido: string | null
          explicacao_simples_maior16: string | null
          explicacao_simples_menor16: string | null
          explicacao_tecnico: string | null
          flashcards: Json | null
          id: number
          Narração: string | null
          "Número do Artigo": string | null
          questoes: Json | null
          termos: Json | null
          termos_aprofundados: Json | null
          ultima_atualizacao: string | null
          versao_conteudo: number | null
        }
        Insert: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Update: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id?: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Relationships: []
      }
      "ESTATUTO - PESSOA COM DEFICIÊNCIA": {
        Row: {
          Artigo: string | null
          Aula: string | null
          Comentario: string | null
          exemplo: string | null
          explicacao_resumido: string | null
          explicacao_simples_maior16: string | null
          explicacao_simples_menor16: string | null
          explicacao_tecnico: string | null
          flashcards: Json | null
          id: number
          Narração: string | null
          "Número do Artigo": string | null
          questoes: Json | null
          termos: Json | null
          termos_aprofundados: Json | null
          ultima_atualizacao: string | null
          versao_conteudo: number | null
        }
        Insert: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Update: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id?: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Relationships: []
      }
      "ESTATUTO - TORCEDOR": {
        Row: {
          Artigo: string | null
          Aula: string | null
          Comentario: string | null
          exemplo: string | null
          explicacao_resumido: string | null
          explicacao_simples_maior16: string | null
          explicacao_simples_menor16: string | null
          explicacao_tecnico: string | null
          flashcards: Json | null
          id: number
          Narração: string | null
          "Número do Artigo": string | null
          questoes: Json | null
          termos: Json | null
          termos_aprofundados: Json | null
          ultima_atualizacao: string | null
          versao_conteudo: number | null
        }
        Insert: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Update: {
          Artigo?: string | null
          Aula?: string | null
          Comentario?: string | null
          exemplo?: string | null
          explicacao_resumido?: string | null
          explicacao_simples_maior16?: string | null
          explicacao_simples_menor16?: string | null
          explicacao_tecnico?: string | null
          flashcards?: Json | null
          id?: number
          Narração?: string | null
          "Número do Artigo"?: string | null
          questoes?: Json | null
          termos?: Json | null
          termos_aprofundados?: Json | null
          ultima_atualizacao?: string | null
          versao_conteudo?: number | null
        }
        Relationships: []
      }
      FLASHCARDS: {
        Row: {
          area: string | null
          exemplo: string | null
          id: number
          pergunta: string | null
          resposta: string | null
          tema: string | null
        }
        Insert: {
          area?: string | null
          exemplo?: string | null
          id: number
          pergunta?: string | null
          resposta?: string | null
          tema?: string | null
        }
        Update: {
          area?: string | null
          exemplo?: string | null
          id?: number
          pergunta?: string | null
          resposta?: string | null
          tema?: string | null
        }
        Relationships: []
      }
      "IMAGEM - DESKTOP": {
        Row: {
          Imagem: number
          link: string | null
        }
        Insert: {
          Imagem: number
          link?: string | null
        }
        Update: {
          Imagem?: number
          link?: string | null
        }
        Relationships: []
      }
      jogos_juridicos: {
        Row: {
          area: string
          cache_validade: string | null
          created_at: string | null
          dados_jogo: Json
          dificuldade: string
          id: string
          tema: string
          tipo: string
        }
        Insert: {
          area: string
          cache_validade?: string | null
          created_at?: string | null
          dados_jogo: Json
          dificuldade: string
          id?: string
          tema: string
          tipo: string
        }
        Update: {
          area?: string
          cache_validade?: string | null
          created_at?: string | null
          dados_jogo?: Json
          dificuldade?: string
          id?: string
          tema?: string
          tipo?: string
        }
        Relationships: []
      }
      JURIFLIX: {
        Row: {
          ano: number | null
          beneficios: string | null
          capa: string | null
          id: number
          link: string | null
          "link Video": string | null
          nome: string | null
          nota: string | null
          plataforma: string | null
          sinopse: string | null
          tipo: string | null
          trailer: string | null
        }
        Insert: {
          ano?: number | null
          beneficios?: string | null
          capa?: string | null
          id: number
          link?: string | null
          "link Video"?: string | null
          nome?: string | null
          nota?: string | null
          plataforma?: string | null
          sinopse?: string | null
          tipo?: string | null
          trailer?: string | null
        }
        Update: {
          ano?: number | null
          beneficios?: string | null
          capa?: string | null
          id?: number
          link?: string | null
          "link Video"?: string | null
          nome?: string | null
          nota?: string | null
          plataforma?: string | null
          sinopse?: string | null
          tipo?: string | null
          trailer?: string | null
        }
        Relationships: []
      }
      NOVIDADES: {
        Row: {
          Área: string | null
          Atualização: string | null
          Dia: string | null
        }
        Insert: {
          Área?: string | null
          Atualização?: string | null
          Dia?: string | null
        }
        Update: {
          Área?: string | null
          Atualização?: string | null
          Dia?: string | null
        }
        Relationships: []
      }
      PETIÇÃO: {
        Row: {
          id: number
          Link: string | null
          Petições: string | null
        }
        Insert: {
          id: number
          Link?: string | null
          Petições?: string | null
        }
        Update: {
          id?: number
          Link?: string | null
          Petições?: string | null
        }
        Relationships: []
      }
      pro_purchases: {
        Row: {
          amount: number | null
          created_at: string | null
          id: string
          payment_id: string | null
          status: string | null
          user_ip: string
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          id?: string
          payment_id?: string | null
          status?: string | null
          user_ip: string
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          id?: string
          payment_id?: string | null
          status?: string | null
          user_ip?: string
        }
        Relationships: []
      }
      "RANKING-FACULDADES": {
        Row: {
          avaliacao_cn: number | null
          avaliacao_mec: number | null
          estado: string | null
          id: number
          nota_concluintes: number | null
          nota_doutores: number | null
          nota_geral: number | null
          posicao: number | null
          qualidade: number | null
          qualidade_doutores: number | null
          quantidade_doutores: number | null
          tipo: string | null
          universidade: string
        }
        Insert: {
          avaliacao_cn?: number | null
          avaliacao_mec?: number | null
          estado?: string | null
          id: number
          nota_concluintes?: number | null
          nota_doutores?: number | null
          nota_geral?: number | null
          posicao?: number | null
          qualidade?: number | null
          qualidade_doutores?: number | null
          quantidade_doutores?: number | null
          tipo?: string | null
          universidade: string
        }
        Update: {
          avaliacao_cn?: number | null
          avaliacao_mec?: number | null
          estado?: string | null
          id?: number
          nota_concluintes?: number | null
          nota_doutores?: number | null
          nota_geral?: number | null
          posicao?: number | null
          qualidade?: number | null
          qualidade_doutores?: number | null
          quantidade_doutores?: number | null
          tipo?: string | null
          universidade?: string
        }
        Relationships: []
      }
      RESUMO: {
        Row: {
          area: string | null
          conteudo: string | null
          conteudo_gerado: Json | null
          id: number
          "ordem subtema": string | null
          "ordem Tema": string | null
          subtema: string | null
          tema: string | null
          ultima_atualizacao: string | null
        }
        Insert: {
          area?: string | null
          conteudo?: string | null
          conteudo_gerado?: Json | null
          id?: number
          "ordem subtema"?: string | null
          "ordem Tema"?: string | null
          subtema?: string | null
          tema?: string | null
          ultima_atualizacao?: string | null
        }
        Update: {
          area?: string | null
          conteudo?: string | null
          conteudo_gerado?: Json | null
          id?: number
          "ordem subtema"?: string | null
          "ordem Tema"?: string | null
          subtema?: string | null
          tema?: string | null
          ultima_atualizacao?: string | null
        }
        Relationships: []
      }
      SIMULACAO_CASOS: {
        Row: {
          area: string
          artigos_fundamentacao_corretos: Json | null
          artigos_ids: number[] | null
          artigos_relacionados: Json | null
          avatar_advogado_reu: string | null
          avatar_juiza: string | null
          cache_validade: string | null
          contexto_inicial: string
          created_at: string | null
          dicas: string[] | null
          dificuldade_ia: string | null
          estrutura_audiencia: Json | null
          fases: Json | null
          fatos_relevantes: Json | null
          feedback_negativo: string[] | null
          feedback_positivo: string[] | null
          genero_advogado_reu: string | null
          genero_jogador: string | null
          id: number
          livros_relacionados: Json | null
          mensagens_juiza: Json | null
          modo: string | null
          nivel_dificuldade: Database["public"]["Enums"]["nivel_dificuldade"]
          nome_advogado_reu: string | null
          nome_cliente: string | null
          nome_juiza: string | null
          nome_reu: string | null
          objecoes_disponiveis: Json | null
          perfil_advogado_reu: string | null
          perfil_cliente: string | null
          perfil_juiza: string | null
          perfil_reu: string | null
          permite_rebatimentos: boolean | null
          pontuacao_maxima: number | null
          preferencias_juiza: Json | null
          prompt_imagem: string | null
          provas: Json | null
          provas_visuais: Json | null
          questoes_alternativas: Json | null
          reacoes_disponiveis: Json | null
          rebatimentos_reu: Json | null
          refutacoes_por_opcao: Json | null
          sentenca_esperada_merito: string | null
          sentenca_ideal: string | null
          tabela_artigos: string | null
          tema: string
          template_respostas_adversario: Json | null
          template_respostas_juiza: Json | null
          testemunhas: Json | null
          tipo_adversario: string | null
          titulo_caso: string
          updated_at: string | null
          valor_condenacao_esperado: number | null
        }
        Insert: {
          area: string
          artigos_fundamentacao_corretos?: Json | null
          artigos_ids?: number[] | null
          artigos_relacionados?: Json | null
          avatar_advogado_reu?: string | null
          avatar_juiza?: string | null
          cache_validade?: string | null
          contexto_inicial: string
          created_at?: string | null
          dicas?: string[] | null
          dificuldade_ia?: string | null
          estrutura_audiencia?: Json | null
          fases?: Json | null
          fatos_relevantes?: Json | null
          feedback_negativo?: string[] | null
          feedback_positivo?: string[] | null
          genero_advogado_reu?: string | null
          genero_jogador?: string | null
          id?: number
          livros_relacionados?: Json | null
          mensagens_juiza?: Json | null
          modo?: string | null
          nivel_dificuldade?: Database["public"]["Enums"]["nivel_dificuldade"]
          nome_advogado_reu?: string | null
          nome_cliente?: string | null
          nome_juiza?: string | null
          nome_reu?: string | null
          objecoes_disponiveis?: Json | null
          perfil_advogado_reu?: string | null
          perfil_cliente?: string | null
          perfil_juiza?: string | null
          perfil_reu?: string | null
          permite_rebatimentos?: boolean | null
          pontuacao_maxima?: number | null
          preferencias_juiza?: Json | null
          prompt_imagem?: string | null
          provas?: Json | null
          provas_visuais?: Json | null
          questoes_alternativas?: Json | null
          reacoes_disponiveis?: Json | null
          rebatimentos_reu?: Json | null
          refutacoes_por_opcao?: Json | null
          sentenca_esperada_merito?: string | null
          sentenca_ideal?: string | null
          tabela_artigos?: string | null
          tema: string
          template_respostas_adversario?: Json | null
          template_respostas_juiza?: Json | null
          testemunhas?: Json | null
          tipo_adversario?: string | null
          titulo_caso: string
          updated_at?: string | null
          valor_condenacao_esperado?: number | null
        }
        Update: {
          area?: string
          artigos_fundamentacao_corretos?: Json | null
          artigos_ids?: number[] | null
          artigos_relacionados?: Json | null
          avatar_advogado_reu?: string | null
          avatar_juiza?: string | null
          cache_validade?: string | null
          contexto_inicial?: string
          created_at?: string | null
          dicas?: string[] | null
          dificuldade_ia?: string | null
          estrutura_audiencia?: Json | null
          fases?: Json | null
          fatos_relevantes?: Json | null
          feedback_negativo?: string[] | null
          feedback_positivo?: string[] | null
          genero_advogado_reu?: string | null
          genero_jogador?: string | null
          id?: number
          livros_relacionados?: Json | null
          mensagens_juiza?: Json | null
          modo?: string | null
          nivel_dificuldade?: Database["public"]["Enums"]["nivel_dificuldade"]
          nome_advogado_reu?: string | null
          nome_cliente?: string | null
          nome_juiza?: string | null
          nome_reu?: string | null
          objecoes_disponiveis?: Json | null
          perfil_advogado_reu?: string | null
          perfil_cliente?: string | null
          perfil_juiza?: string | null
          perfil_reu?: string | null
          permite_rebatimentos?: boolean | null
          pontuacao_maxima?: number | null
          preferencias_juiza?: Json | null
          prompt_imagem?: string | null
          provas?: Json | null
          provas_visuais?: Json | null
          questoes_alternativas?: Json | null
          reacoes_disponiveis?: Json | null
          rebatimentos_reu?: Json | null
          refutacoes_por_opcao?: Json | null
          sentenca_esperada_merito?: string | null
          sentenca_ideal?: string | null
          tabela_artigos?: string | null
          tema?: string
          template_respostas_adversario?: Json | null
          template_respostas_juiza?: Json | null
          testemunhas?: Json | null
          tipo_adversario?: string | null
          titulo_caso?: string
          updated_at?: string | null
          valor_condenacao_esperado?: number | null
        }
        Relationships: []
      }
      SIMULACAO_PARTIDAS: {
        Row: {
          acertos: string[] | null
          acoes_realizadas: Json | null
          argumentacoes_escolhidas: Json | null
          artigos_citados: Json | null
          avatar_escolhido: string | null
          caso_id: number | null
          combo_atual: number | null
          combo_maximo: number | null
          conquistas_desbloqueadas: Json | null
          created_at: string | null
          credibilidade: number | null
          deferido: boolean | null
          desvantagens: Json | null
          erros: string[] | null
          escolhas_detalhadas: Json | null
          estrategia_escolhida: string | null
          experiencia: number | null
          foco: number | null
          fundamentacao_legal_score: number | null
          habilidades: Json | null
          historico_mensagens: Json | null
          historico_turnos: Json | null
          id: number
          interrupcoes_sofridas: number | null
          nivel_advogado: string | null
          objecoes_realizadas: Json | null
          pausado_em: string | null
          pontuacao_final: number | null
          provas_escolhidas: Json | null
          reacoes_juiza: Json | null
          rebatimentos_realizados: Json | null
          sentenca_recebida: string | null
          sugestoes_melhoria: string[] | null
          tempo_jogado: number | null
          turno_atual: string | null
          user_id: string | null
          vantagens: Json | null
        }
        Insert: {
          acertos?: string[] | null
          acoes_realizadas?: Json | null
          argumentacoes_escolhidas?: Json | null
          artigos_citados?: Json | null
          avatar_escolhido?: string | null
          caso_id?: number | null
          combo_atual?: number | null
          combo_maximo?: number | null
          conquistas_desbloqueadas?: Json | null
          created_at?: string | null
          credibilidade?: number | null
          deferido?: boolean | null
          desvantagens?: Json | null
          erros?: string[] | null
          escolhas_detalhadas?: Json | null
          estrategia_escolhida?: string | null
          experiencia?: number | null
          foco?: number | null
          fundamentacao_legal_score?: number | null
          habilidades?: Json | null
          historico_mensagens?: Json | null
          historico_turnos?: Json | null
          id?: number
          interrupcoes_sofridas?: number | null
          nivel_advogado?: string | null
          objecoes_realizadas?: Json | null
          pausado_em?: string | null
          pontuacao_final?: number | null
          provas_escolhidas?: Json | null
          reacoes_juiza?: Json | null
          rebatimentos_realizados?: Json | null
          sentenca_recebida?: string | null
          sugestoes_melhoria?: string[] | null
          tempo_jogado?: number | null
          turno_atual?: string | null
          user_id?: string | null
          vantagens?: Json | null
        }
        Update: {
          acertos?: string[] | null
          acoes_realizadas?: Json | null
          argumentacoes_escolhidas?: Json | null
          artigos_citados?: Json | null
          avatar_escolhido?: string | null
          caso_id?: number | null
          combo_atual?: number | null
          combo_maximo?: number | null
          conquistas_desbloqueadas?: Json | null
          created_at?: string | null
          credibilidade?: number | null
          deferido?: boolean | null
          desvantagens?: Json | null
          erros?: string[] | null
          escolhas_detalhadas?: Json | null
          estrategia_escolhida?: string | null
          experiencia?: number | null
          foco?: number | null
          fundamentacao_legal_score?: number | null
          habilidades?: Json | null
          historico_mensagens?: Json | null
          historico_turnos?: Json | null
          id?: number
          interrupcoes_sofridas?: number | null
          nivel_advogado?: string | null
          objecoes_realizadas?: Json | null
          pausado_em?: string | null
          pontuacao_final?: number | null
          provas_escolhidas?: Json | null
          reacoes_juiza?: Json | null
          rebatimentos_realizados?: Json | null
          sentenca_recebida?: string | null
          sugestoes_melhoria?: string[] | null
          tempo_jogado?: number | null
          turno_atual?: string | null
          user_id?: string | null
          vantagens?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "SIMULACAO_PARTIDAS_caso_id_fkey"
            columns: ["caso_id"]
            isOneToOne: false
            referencedRelation: "SIMULACAO_CASOS"
            referencedColumns: ["id"]
          },
        ]
      }
      SIMULACAO_PARTIDAS_JUIZ: {
        Row: {
          acertos: string[] | null
          advertencias_dadas: number | null
          argumentos_julgados: Json | null
          artigos_fundamentacao: Json | null
          caso_id: number | null
          contradicoes_resolvidas: Json | null
          created_at: string | null
          custas_responsavel: string | null
          decisao_merito: string | null
          decisoes_preparacao: Json | null
          erros: string[] | null
          excecoes_processuais: Json | null
          fundamentacao_correta: boolean | null
          historico_mensagens: Json | null
          honorarios_percentual: number | null
          id: number
          materiais_recomendados: Json | null
          motivos_recurso: string[] | null
          multas_aplicadas: number | null
          nivel_juiz: string | null
          nota_celeridade: number | null
          nota_justica: number | null
          nota_ordem_processual: number | null
          perguntas_deferidas: number | null
          perguntas_indeferidas: number | null
          pontuacao_total: number | null
          provas_aceitas: Json | null
          provas_indeferidas: Json | null
          recurso_acolhido: boolean | null
          reputacao: number | null
          sentenca_correta: boolean | null
          sugestoes_melhoria: string[] | null
          tempo_audiencia_minutos: number | null
          testemunhas_convocadas: Json | null
          updated_at: string | null
          user_id: string | null
          valor_condenacao: number | null
        }
        Insert: {
          acertos?: string[] | null
          advertencias_dadas?: number | null
          argumentos_julgados?: Json | null
          artigos_fundamentacao?: Json | null
          caso_id?: number | null
          contradicoes_resolvidas?: Json | null
          created_at?: string | null
          custas_responsavel?: string | null
          decisao_merito?: string | null
          decisoes_preparacao?: Json | null
          erros?: string[] | null
          excecoes_processuais?: Json | null
          fundamentacao_correta?: boolean | null
          historico_mensagens?: Json | null
          honorarios_percentual?: number | null
          id?: number
          materiais_recomendados?: Json | null
          motivos_recurso?: string[] | null
          multas_aplicadas?: number | null
          nivel_juiz?: string | null
          nota_celeridade?: number | null
          nota_justica?: number | null
          nota_ordem_processual?: number | null
          perguntas_deferidas?: number | null
          perguntas_indeferidas?: number | null
          pontuacao_total?: number | null
          provas_aceitas?: Json | null
          provas_indeferidas?: Json | null
          recurso_acolhido?: boolean | null
          reputacao?: number | null
          sentenca_correta?: boolean | null
          sugestoes_melhoria?: string[] | null
          tempo_audiencia_minutos?: number | null
          testemunhas_convocadas?: Json | null
          updated_at?: string | null
          user_id?: string | null
          valor_condenacao?: number | null
        }
        Update: {
          acertos?: string[] | null
          advertencias_dadas?: number | null
          argumentos_julgados?: Json | null
          artigos_fundamentacao?: Json | null
          caso_id?: number | null
          contradicoes_resolvidas?: Json | null
          created_at?: string | null
          custas_responsavel?: string | null
          decisao_merito?: string | null
          decisoes_preparacao?: Json | null
          erros?: string[] | null
          excecoes_processuais?: Json | null
          fundamentacao_correta?: boolean | null
          historico_mensagens?: Json | null
          honorarios_percentual?: number | null
          id?: number
          materiais_recomendados?: Json | null
          motivos_recurso?: string[] | null
          multas_aplicadas?: number | null
          nivel_juiz?: string | null
          nota_celeridade?: number | null
          nota_justica?: number | null
          nota_ordem_processual?: number | null
          perguntas_deferidas?: number | null
          perguntas_indeferidas?: number | null
          pontuacao_total?: number | null
          provas_aceitas?: Json | null
          provas_indeferidas?: Json | null
          recurso_acolhido?: boolean | null
          reputacao?: number | null
          sentenca_correta?: boolean | null
          sugestoes_melhoria?: string[] | null
          tempo_audiencia_minutos?: number | null
          testemunhas_convocadas?: Json | null
          updated_at?: string | null
          user_id?: string | null
          valor_condenacao?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "SIMULACAO_PARTIDAS_JUIZ_caso_id_fkey"
            columns: ["caso_id"]
            isOneToOne: false
            referencedRelation: "SIMULACAO_CASOS"
            referencedColumns: ["id"]
          },
        ]
      }
      "SIMULADO-OAB": {
        Row: {
          "Alternativa A": string | null
          "Alternativa B": string | null
          "Alternativa C": string | null
          "Alternativa D": string | null
          Ano: number | null
          area: string | null
          Banca: string | null
          comentario: string | null
          Enunciado: string | null
          Exame: string | null
          "Numero da questao": number | null
          resposta: string | null
        }
        Insert: {
          "Alternativa A"?: string | null
          "Alternativa B"?: string | null
          "Alternativa C"?: string | null
          "Alternativa D"?: string | null
          Ano?: number | null
          area?: string | null
          Banca?: string | null
          comentario?: string | null
          Enunciado?: string | null
          Exame?: string | null
          "Numero da questao"?: number | null
          resposta?: string | null
        }
        Update: {
          "Alternativa A"?: string | null
          "Alternativa B"?: string | null
          "Alternativa C"?: string | null
          "Alternativa D"?: string | null
          Ano?: number | null
          area?: string | null
          Banca?: string | null
          comentario?: string | null
          Enunciado?: string | null
          Exame?: string | null
          "Numero da questao"?: number | null
          resposta?: string | null
        }
        Relationships: []
      }
      "SOM AMBIENTE": {
        Row: {
          id: number
          link: string | null
          numero: number | null
        }
        Insert: {
          id: number
          link?: string | null
          numero?: number | null
        }
        Update: {
          id?: number
          link?: string | null
          numero?: number | null
        }
        Relationships: []
      }
      SUMULAS: {
        Row: {
          "Data de Aprovação": string | null
          id: number | null
          Narração: string | null
          "Texto da Súmula": string | null
          "Título da Súmula": string | null
        }
        Insert: {
          "Data de Aprovação"?: string | null
          id?: number | null
          Narração?: string | null
          "Texto da Súmula"?: string | null
          "Título da Súmula"?: string | null
        }
        Update: {
          "Data de Aprovação"?: string | null
          id?: number | null
          Narração?: string | null
          "Texto da Súmula"?: string | null
          "Título da Súmula"?: string | null
        }
        Relationships: []
      }
      "SUMULAS VINCULANTES": {
        Row: {
          "Data de Aprovação": string | null
          id: number | null
          Narração: string | null
          "Texto da Súmula": string | null
          "Título da Súmula": string | null
        }
        Insert: {
          "Data de Aprovação"?: string | null
          id?: number | null
          Narração?: string | null
          "Texto da Súmula"?: string | null
          "Título da Súmula"?: string | null
        }
        Update: {
          "Data de Aprovação"?: string | null
          id?: number | null
          Narração?: string | null
          "Texto da Súmula"?: string | null
          "Título da Súmula"?: string | null
        }
        Relationships: []
      }
      user_usage_limits: {
        Row: {
          assistente_acessos: number | null
          created_at: string | null
          exemplos_usados: number | null
          explicacoes_usadas: number | null
          flashcards_usados: number | null
          id: string
          is_pro: boolean | null
          narracoes_usadas: number | null
          questoes_usadas: number | null
          ultimo_reset: string | null
          updated_at: string | null
          user_ip: string
        }
        Insert: {
          assistente_acessos?: number | null
          created_at?: string | null
          exemplos_usados?: number | null
          explicacoes_usadas?: number | null
          flashcards_usados?: number | null
          id?: string
          is_pro?: boolean | null
          narracoes_usadas?: number | null
          questoes_usadas?: number | null
          ultimo_reset?: string | null
          updated_at?: string | null
          user_ip: string
        }
        Update: {
          assistente_acessos?: number | null
          created_at?: string | null
          exemplos_usados?: number | null
          explicacoes_usadas?: number | null
          flashcards_usados?: number | null
          id?: string
          is_pro?: boolean | null
          narracoes_usadas?: number | null
          questoes_usadas?: number | null
          ultimo_reset?: string | null
          updated_at?: string | null
          user_ip?: string
        }
        Relationships: []
      }
      "VIDEO AULAS": {
        Row: {
          area: string | null
          categoria: string | null
          id: number
          link: string | null
        }
        Insert: {
          area?: string | null
          categoria?: string | null
          id: number
          link?: string | null
        }
        Update: {
          area?: string | null
          categoria?: string | null
          id?: number
          link?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_flashcard_areas: {
        Args: Record<PropertyKey, never>
        Returns: {
          area: string
          count: number
        }[]
      }
      get_flashcard_temas: {
        Args: { p_area: string }
        Returns: {
          count: number
          tema: string
        }[]
      }
      reset_daily_limits: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      feature_type:
        | "narracao"
        | "explicacao"
        | "exemplo"
        | "flashcards"
        | "questoes"
        | "assistente"
      forca_opcao: "forte" | "media" | "fraca"
      nivel_dificuldade: "Fácil" | "Médio" | "Difícil"
      vade_role: "admin" | "moderador" | "contribuidor" | "leitor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      feature_type: [
        "narracao",
        "explicacao",
        "exemplo",
        "flashcards",
        "questoes",
        "assistente",
      ],
      forca_opcao: ["forte", "media", "fraca"],
      nivel_dificuldade: ["Fácil", "Médio", "Difícil"],
      vade_role: ["admin", "moderador", "contribuidor", "leitor"],
    },
  },
} as const
