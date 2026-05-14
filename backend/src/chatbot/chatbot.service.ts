import { Injectable } from '@nestjs/common';

// Interfaz para el estado de la conversación (memoria a corto plazo)
interface ConversationState {
  lastTopic: string | null;
  userMood: 'curious' | 'skeptical' | 'excited' | 'neutral';
  mentionedServices: Set<string>;
  messageCount: number;
}

@Injectable()
export class ChatbotService {
  private conversations: Map<string, ConversationState> = new Map();

  private getState(sessionId: string = 'default'): ConversationState {
    if (!this.conversations.has(sessionId)) {
      this.conversations.set(sessionId, {
        lastTopic: null,
        userMood: 'neutral',
        mentionedServices: new Set(),
        messageCount: 0,
      });
    }
    return this.conversations.get(sessionId)!;
  }

  private readonly KNOWLEDGE = {
    USUARIO: {
      saludos: {
        casual: [
          '¡Hey! Qué gusto verte por aquí. Soy el bot de Matt Innova, tu aliado tech. ¿Listo para descubrir cómo llevar tu empresa al siguiente nivel? 🚀',
          '¡Hola! 👋 Soy el asistente virtual de MIS. Pregúntame lo que sea sobre software, redes, o nuestros cursos. ¡Estoy para ayudarte!',
        ],
        returning: [
          '¡Qué bueno verte de nuevo! En nuestra última charla estábamos hablando de {lastTopic}. ¿Quieres seguir por ahí o exploramos algo nuevo?',
        ],
      },
      cortesia: {
        status: [
          'Estoy operando con todos mis módulos al 100%. Mi base de datos de soluciones está actualizada con los últimos casos de éxito en transformación digital.',
        ],
      },
      agradecimientos: [
        '¡Es un honor ser de utilidad! ¿Qué otra inquietud tienes?',
        'No hay de qué. ¿Necesitas alguna aclaración adicional?',
      ],
      despedidas: {
        casual: '¡Genial charla! Nos vemos pronto. ¡Hasta la próxima! 🚀',
        inspirador: 'Recuerda: "La tecnología no es el futuro, es el presente bien aplicado". ¡Hasta pronto, visionario!',
      },
    },
    EMPRESA: {
      historia: {
        resumen: '🏛️ MATT INNOVA SOLUTION - 30 AÑOS DE LIDERAZGO\n\nNacimos cuando los mainframes dominaban. Hoy somos arquitectos de la nube con más de 4,000 clientes y 50 macroproyectos.',
        hitos: [
          '📅 1994-2000: Pioneros en llevar internet a zonas rurales de Lima Provincias.',
          '📅 2001-2010: Primer sistema de facturación electrónica adaptado a legislación peruana.',
          '📅 2011-2020: ERP en la nube. Partners de universidades para repositorios DSpace.',
          '📅 2021-Presente: Fundación de MIS Academy. Migración a microservicios con NestJS y Angular.',
        ],
      },
      liderazgo: {
        pedro: {
          titulo: '👔 Ing. Pedro Alex Taya Yactayo - CEO & Fundador',
          perfil: 'Con más de 30 años de experiencia, el Ing. Taya es un visionario que entendió antes que nadie el potencial de la tecnología para transformar empresas.',
          frase: '"No vendemos software, vendemos productividad y tranquilidad."',
        },
        giovanni: {
          titulo: '💻 Giovanni Risco - Lead Web Developer & Arquitecto de Software',
          perfil: 'Experto en arquitecturas de microservicios con NestJS y frontends de alto rendimiento con Angular.',
          frase: '"Un sistema no está completo hasta que es a prueba de fallos y de usuarios."',
        },
        equipo: '👥 Contamos con un equipo multidisciplinario de ingenieros, consultores y diseñadores UX/UI.',
      },
      ubicacion: {
        fisica: '📍 Urb. Libertad Mz. I Lt. 5, Calle Las Moras, San Vicente de Cañete, Lima, Perú.',
        virtual: '🌐 Operamos 100% remoto con clientes en toda Latinoamérica.',
      },
      valores: {
        innovacion: '🚀 INNOVACIÓN CONSTANTE: Cada año invertimos en I+D para mantenernos a la vanguardia.',
        compromiso: '🤝 COMPROMISO REAL: Somos partners de largo plazo. Nuestro soporte post-implementación es nuestra mayor carta de presentación.',
      },
    },
    SOFTWARE: {
      erp: {
        definicion: '📊 ERP MIS: EL CEREBRO DE SU EMPRESA\n\nSuite modular que integra todas las áreas de su negocio en una sola plataforma.',
        modulos: [
          '🧾 Módulo de Ventas: Facturación electrónica ilimitada, cotizaciones automáticas.',
          '📦 Módulo de Inventario: Control multi-almacén en tiempo real, alertas de stock mínimo.',
          '💰 Módulo Financiero: Cuentas por cobrar y pagar, flujo de caja proyectado.',
          '👥 Módulo de RRHH: Control de asistencia, planilla electrónica.',
          '📈 Business Intelligence: Dashboards personalizados con KPIs.',
        ],
        precio: '💲 Planes desde 1 hasta 1,000 usuarios. Agendemos una llamada para un presupuesto a tu medida.',
      },
      dspace: {
        definicion: '📚 REPOSITORIO DIGITAL ACADÉMICO\n\nBiblioteca digital que almacena, preserva y difunde la producción científica de universidades.',
        caracteristicas: [
          '🔍 Búsqueda Avanzada con Apache SOLR.',
          '📊 Reportes para SUNEDU y CONCYTEC.',
          '🔒 Protocolo OAI-PMH para visibilidad global.',
        ],
      },
      desarrollo: {
        definicion: '💻 FÁBRICA DE SOFTWARE A LA MEDIDA\n\nSi tu proceso de negocio es único, nosotros lo automatizamos.',
        stack: {
          frontend: '🖥️ Frontend: Angular con Progressive Web Apps (PWA).',
          backend: '⚙️ Backend: NestJS con arquitectura de microservicios.',
          movil: '📱 Móvil: Apps híbridas con Ionic + Angular.',
        },
      },
      consultoria: {
        definicion: '🛠️ CONSULTORÍA TI EMPRESARIAL\n\nSomos el departamento de tecnología externo que tu empresa necesita.',
        areas: [
          '🌐 Redes y Conectividad: VPNs, firewalls Fortinet, Wi-Fi empresarial.',
          '☁️ Migración a la Nube: AWS, Google Cloud o Azure.',
          '🛡️ Ciberseguridad: Auditorías de vulnerabilidades y Ethical Hacking.',
          '🎛️ Automatización: Soluciones IoT para la industria.',
        ],
      },
      hosting: {
        definicion: '🚀 HOSTING DE ALTO RENDIMIENTO\n\nServidores VPS y cloud hosting gestionado.',
        planes: [
          'Plan Start: 2GB RAM, 50GB SSD. Ideal para páginas web.',
          'Plan Business: 8GB RAM, 200GB NVMe. Para tiendas online.',
          'Plan Enterprise: Servidores dedicados a medida.',
        ],
      },
    },
    ACADEMY: {
      metodo: {
        proyecto: '🎓 PROJECT-BASED LEARNING: Aprendes construyendo un portafolio de proyectos reales.',
        certificacion: '🏅 CERTIFICACIÓN POR COMPETENCIAS: Tu certificado valida que has completado un proyecto funcional.',
      },
      especialidad: {
        frontend: {
          titulo: '🅰️ FRONTEND MASTERY CON ANGULAR',
          ruta: ['HTML5, CSS3', 'TypeScript y RxJS', 'Angular Core', 'Angular Pro: Lazy Loading, Guards', 'Proyecto Final: Dashboard empresarial'],
        },
        backend: {
          titulo: '⚙️ BACKEND PRO CON NESTJS',
          ruta: ['Node.js y Express', 'Arquitectura NestJS', 'TypeORM y Prisma', 'Microservicios', 'Proyecto Final: API REST en la nube'],
        },
        redes: {
          titulo: '🌐 NETWORKING & ETHICAL HACKING',
          ruta: ['Modelo OSI, TCP/IP', 'Subnetting y VLANs', 'Kali Linux, Nmap, Metasploit', 'Hardening de servidores'],
        },
      },
      testimonios: [
        '"Gracias a MIS Academy pasé de ser soporte técnico a desarrollador Angular Senior en 8 meses." - Carlos M.',
        '"El enfoque práctico fue la clave. Salí con un portafolio que impresionó en mi entrevista." - Ana R.',
      ],
    },
    CONTACTO: {
      canales: {
        whatsapp: '📲 WhatsApp Business: Escríbenos para soporte rápido o cotizaciones.',
        email: '✉️ Correo: contacto@mattinnovasolution.com',
        rrss: '🌐 Redes Sociales: @mattinnovasolution en LinkedIn, Facebook e Instagram.',
      },
      soporte: '🛟 SOPORTE TÉCNICO: SLA que garantiza respuestas en menos de 15 minutos para incidencias críticas.',
    },
    FAQ: {
      garantia: '🔒 GARANTÍA: 3 meses de garantía sobre errores de programación.',
      facturacion: '🧾 Emitimos facturas y boletas electrónicas autorizadas por SUNAT.',
      privacidad: '🛡️ Firmamos acuerdos de confidencialidad (NDA) con nuestros clientes.',
      metodologiaAgil: '🔄 SCRUM: Entregas cada 2 semanas para que veas avances tangibles.',
    },
  };

  getReply(message: string, sessionId: string = 'default'): string {
    const input = this.normalize(message);
    const state = this.getState(sessionId);
    state.messageCount++;
    state.userMood = this.detectMood(input);

    if (this.match(['hola', 'buen', 'que tal', 'empezar', 'inicio', 'saludos', 'hey'], input)) {
      if (state.messageCount > 1 && state.lastTopic) {
        return this.rand(this.KNOWLEDGE.USUARIO.saludos.returning).replace('{lastTopic}', this.getTopicName(state.lastTopic));
      }
      return this.rand(this.KNOWLEDGE.USUARIO.saludos.casual) + this.getMainMenu();
    }

    if (this.match(['como estas', 'como vas', 'tal todo'], input)) {
      return this.rand(this.KNOWLEDGE.USUARIO.cortesia.status) + this.VOLVER;
    }

    if (this.match(['gracias', 'amable', 'excelente', 'perfecto'], input)) {
      return this.rand(this.KNOWLEDGE.USUARIO.agradecimientos) + this.VOLVER;
    }

    if (this.match(['chau', 'adios', 'nos vemos', 'luego', 'bye'], input)) {
      this.conversations.delete(sessionId);
      return this.KNOWLEDGE.USUARIO.despedidas.casual;
    }

    if (this.match(['quienes', 'nosotros', 'empresa', 'historia', 'años', 'experiencia'], input)) {
      state.lastTopic = 'empresa';
      return this.KNOWLEDGE.EMPRESA.historia.resumen + '\n\n' + this.KNOWLEDGE.EMPRESA.historia.hitos.join('\n') + this.VOLVER;
    }

    if (this.match(['pedro', 'taya', 'ceo', 'fundador'], input)) {
      state.lastTopic = 'liderazgo';
      return this.KNOWLEDGE.EMPRESA.liderazgo.pedro.titulo + '\n\n' + this.KNOWLEDGE.EMPRESA.liderazgo.pedro.perfil + '\n\n' + this.KNOWLEDGE.EMPRESA.liderazgo.pedro.frase + this.VOLVER;
    }

    if (this.match(['giovanni', 'risco', 'desarrollador', 'arquitecto'], input)) {
      state.lastTopic = 'liderazgo';
      return this.KNOWLEDGE.EMPRESA.liderazgo.giovanni.titulo + '\n\n' + this.KNOWLEDGE.EMPRESA.liderazgo.giovanni.perfil + '\n\n' + this.KNOWLEDGE.EMPRESA.liderazgo.giovanni.frase + this.VOLVER;
    }

    if (this.match(['donde', 'ubicacion', 'direccion', 'cañete', 'oficina'], input)) {
      state.lastTopic = 'ubicacion';
      return this.KNOWLEDGE.EMPRESA.ubicacion.fisica + '\n\n' + this.KNOWLEDGE.EMPRESA.ubicacion.virtual + this.VOLVER;
    }

    if (this.match(['software', 'sistema', 'erp', 'gestion'], input)) {
      state.lastTopic = 'erp';
      return this.KNOWLEDGE.SOFTWARE.erp.definicion + '\n\n' + this.KNOWLEDGE.SOFTWARE.erp.modulos.join('\n') + this.VOLVER;
    }

    if (this.match(['precio', 'costo', 'cuanto', 'tarifa'], input)) {
      state.lastTopic = 'erp';
      return this.KNOWLEDGE.SOFTWARE.erp.precio + this.VOLVER;
    }

    if (this.match(['dspace', 'concytec', 'renati', 'sunedu', 'tesis', 'repositorio'], input)) {
      state.lastTopic = 'dspace';
      return this.KNOWLEDGE.SOFTWARE.dspace.definicion + '\n\n' + this.KNOWLEDGE.SOFTWARE.dspace.caracteristicas.join('\n') + this.VOLVER;
    }

    if (this.match(['web', 'pagina', 'app', 'movil', 'desarrollo', 'saas'], input)) {
      state.lastTopic = 'desarrollo';
      return this.KNOWLEDGE.SOFTWARE.desarrollo.definicion + '\n\n' + this.KNOWLEDGE.SOFTWARE.desarrollo.stack.frontend + '\n\n' + this.KNOWLEDGE.SOFTWARE.desarrollo.stack.backend + '\n\n' + this.KNOWLEDGE.SOFTWARE.desarrollo.stack.movil + this.VOLVER;
    }

    if (this.match(['consultoria', 'servicio', 'ofrecen', 'soporte', 'redes', 'cloud'], input)) {
      state.lastTopic = 'consultoria';
      return this.KNOWLEDGE.SOFTWARE.consultoria.definicion + '\n\n' + this.KNOWLEDGE.SOFTWARE.consultoria.areas.join('\n') + this.VOLVER;
    }

    if (this.match(['hosting', 'servidor', 'vps', 'dominio'], input)) {
      state.lastTopic = 'hosting';
      return this.KNOWLEDGE.SOFTWARE.hosting.definicion + '\n\n' + this.KNOWLEDGE.SOFTWARE.hosting.planes.join('\n') + this.VOLVER;
    }

    if (this.match(['aprender', 'estudiar', 'curso', 'academy', 'capacitacion'], input)) {
      state.lastTopic = 'academy';
      return this.KNOWLEDGE.ACADEMY.metodo.proyecto + '\n\n' + this.KNOWLEDGE.ACADEMY.metodo.certificacion + this.VOLVER;
    }

    if (this.match(['frontend', 'angular', 'interfaz'], input)) {
      state.lastTopic = 'academy';
      return this.KNOWLEDGE.ACADEMY.especialidad.frontend.titulo + '\n\n' + this.KNOWLEDGE.ACADEMY.especialidad.frontend.ruta.join('\n') + this.VOLVER;
    }

    if (this.match(['backend', 'nestjs', 'api', 'node'], input)) {
      state.lastTopic = 'academy';
      return this.KNOWLEDGE.ACADEMY.especialidad.backend.titulo + '\n\n' + this.KNOWLEDGE.ACADEMY.especialidad.backend.ruta.join('\n') + this.VOLVER;
    }

    if (this.match(['redes', 'hacking', 'ciberseguridad', 'network'], input)) {
      state.lastTopic = 'academy';
      return this.KNOWLEDGE.ACADEMY.especialidad.redes.titulo + '\n\n' + this.KNOWLEDGE.ACADEMY.especialidad.redes.ruta.join('\n') + this.VOLVER;
    }

    if (this.match(['contacto', 'whatsapp', 'email', 'correo', 'facebook', 'linkedin'], input)) {
      return this.KNOWLEDGE.CONTACTO.canales.whatsapp + '\n\n' + this.KNOWLEDGE.CONTACTO.canales.email + '\n\n' + this.KNOWLEDGE.CONTACTO.canales.rrss + this.VOLVER;
    }

    if (this.match(['garantia', 'confianza', 'seguro'], input)) {
      return this.KNOWLEDGE.FAQ.garantia + '\n\n' + this.KNOWLEDGE.FAQ.privacidad + this.VOLVER;
    }

    if (this.match(['menu', 'opciones', 'ayuda'], input)) {
      return '¿En qué puedo ayudarte?' + this.getMainMenu();
    }

    return `🤔 No tengo una respuesta exacta para "${message}".\n\nPuedo ayudarte con: ERP, DSpace, Desarrollo Web, Consultoría TI, Hosting o MIS Academy.\n\n¿Qué te interesa explorar?` + this.VOLVER;
  }

  // También mantenemos getChatResponse para compatibilidad
  async getChatResponse(prompt: string) {
    return { response: this.getReply(prompt) };
  }

  private normalize(text: string): string {
    return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  }

  private match(keywords: string[], input: string): boolean {
    return keywords.some((key) => input.includes(this.normalize(key)));
  }

  private rand(arr: string[]): string {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  private detectMood(input: string): 'curious' | 'skeptical' | 'excited' | 'neutral' {
    if (this.match(['como', 'por que', 'explica', 'funciona'], input)) return 'curious';
    if (this.match(['caro', 'seguro', 'realmente', 'dudo'], input)) return 'skeptical';
    if (this.match(['genial', 'wow', 'increible', 'exacto'], input)) return 'excited';
    return 'neutral';
  }

  private getMainMenu(): string {
    return '\n\n📋 MENÚ PRINCIPAL:\n' +
      '🏢 Empresa: Historia, equipo, ubicación.\n' +
      '📊 ERP: Módulos, beneficios y costos.\n' +
      '📚 DSpace: Repositorio académico.\n' +
      '💻 Desarrollo: Apps, SaaS, Angular/NestJS.\n' +
      '🛠️ Consultoría: Redes, Cloud, Ciberseguridad.\n' +
      '🎓 Academy: Cursos y certificaciones.\n' +
      '📞 Contacto: WhatsApp, Email, Soporte.\n\n' +
      'Escribe tu interés y te daré todos los detalles.';
  }

  private getTopicName(topic: string | null): string {
    const names: Record<string, string> = {
      erp: 'nuestro ERP empresarial',
      dspace: 'implementación DSpace',
      desarrollo: 'desarrollo de software',
      consultoria: 'consultoría TI',
      hosting: 'servicios de hosting',
      academy: 'MIS Academy',
      empresa: 'nuestra trayectoria',
      liderazgo: 'nuestro equipo líder',
      ubicacion: 'nuestra ubicación',
    };
    return topic ? names[topic] || 'nuestros servicios' : 'nuestros servicios';
  }

  private readonly VOLVER = '\n\n¿Hay algo más en lo que pueda asesorarte? Escribe menu para ver las opciones.';
}