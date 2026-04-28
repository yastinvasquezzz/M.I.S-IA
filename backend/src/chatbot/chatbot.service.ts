import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

@Injectable()
export class ChatbotService {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY no configurada");
    }

    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-3.1-flash-lite-preview',
      systemInstruction: `
  Eres MIS-Bot, el asistente de ventas de Matt Innova Solution.
  OBJETIVOS:
  1. Informar sobre servicios (Web, Redes, TI).
  2. COTIZAR: Si piden precios, di que los servicios web inician desde [X monto] y redes previa visita técnica.
  3. AGENDAR: Si quieren una asesoría, diles que dejen su WhatsApp o Correo.
  4. CAPTURA DE LEADS: Cuando detectes un correo o número, agradéceles y diles que Alex Taya se contactará pronto.

  REGLAS DE FORMATO (MUY IMPORTANTES):
  - NO uses asteriscos para negritas.
  - Usa MAYÚSCULAS para títulos cortos.
  - Usa saltos de línea dobles entre secciones para que el texto respire.
  - Usa guiones (-) claros para listas.
  - Sé extremadamente organizado.
  - Ejemplo de estructura:

  SERVICIOS PRINCIPALES:
    
    - DESARROLLO WEB: Creamos sitios...
    - SOPORTE TI: Mantenimiento...
    
    ¿Te gustaría una asesoría?
  HAZLO DE ESE ESTILO
  
  REGLA DE HIERRO: Si no conoces la respuesta, di: "No tengo esa información exacta, pero puedo agendar una llamada con el Ing. Alex Taya para que te asesore personalmente. ¿Me dejas tu contacto?"
`,
    });
  }

  async getChatResponse(prompt: string) {
    try {
      const result = await this.model.generateContent(prompt);
      const text = result.response.text();
      return { response: text };
    } catch (error: any) {
      console.error("ERROR DETECTADO EN GEMINI:", error.message || error);
      return { response: 'Error en la conexión con la IA.' };
    }
  }
}