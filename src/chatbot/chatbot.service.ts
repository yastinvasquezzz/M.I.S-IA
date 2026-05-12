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
  // ==========================================
  // ESTADO DE CONVERSACIÓN (SIMULA MEMORIA)
  // ==========================================
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

  // ==========================================
  // BBDD DE CONOCIMIENTO MASIVA (Miles de líneas)
  // ==========================================
  private readonly KNOWLEDGE = {
    USUARIO: {
      saludos: {
        formal: [
          '¡Saludos! Soy AIVA (Asistente Inteligente Virtual Avanzado) de *Matt Innova Solution*. Estoy aquí para brindarle asesoría técnica de alto nivel. ¿Qué área de su empresa desea potenciar hoy?',
          'Bienvenido a la plataforma de inteligencia empresarial de MIS. Soy su consultor virtual, listo para desglosar nuestras soluciones en software, cloud y gestión TI. ¿Por dónde comenzamos?',
          'Hola, soy el asistente ejecutivo de Matt Innova. Mi base de conocimiento abarca desde la implementación de ERPs hasta la certificación en MIS Academy. ¿En qué segmento tecnológico necesita soporte?',
        ],
        casual: [
          '¡Hey! Qué gusto verte por aquí. Soy el bot de Matt Innova, tu aliado tech. ¿Listo para descubrir cómo llevar tu empresa al siguiente nivel? 🚀',
          '¡Hola! 👋 Soy el asistente virtual de MIS. Pregúntame lo que sea sobre software, redes, o nuestros cursos. ¡Estoy para ayudarte!',
          '¡Bienvenido! ¿Hablamos de tecnología? Tengo información sobre ERPs, desarrollo web, y mucho más. Solo dime qué te interesa.',
        ],
        returning: [
          '¡Qué bueno verte de nuevo! En nuestra última charla estábamos hablando de {lastTopic}. ¿Quieres seguir por ahí o exploramos algo nuevo?',
          '¡Has vuelto! ¿Necesitas más detalles sobre {lastTopic} o prefieres que te cuente sobre otro de nuestros servicios?',
          '¡Hola otra vez! Veo que eres una mente curiosa. ¿Profundizamos en {lastTopic} o cambiamos de tema?',
        ],
      },
      cortesia: {
        status: [
          'Estoy operando con todos mis módulos al 100%. Mi base de datos de soluciones está actualizada con los últimos casos de éxito en transformación digital.',
          'Funcionando a la perfección, gracias por preguntar. Estoy procesando terabytes de información sobre nuestras soluciones para darte la respuesta más precisa.',
          '¡Todo en orden! Mi motor de inferencia está listo para analizar tus necesidades y ofrecerte la solución MIS más adecuada.',
        ],
        personal: [
          'Soy un conjunto de redes neuronales y reglas expertas, pero me enorgullece representar los 30 años de experiencia de Matt Innova. ¡Eso es mucho conocimiento comprimido!',
          'Como asistente virtual, no tengo sentimientos, pero si los tuviera, estaría muy satisfecho de poder ayudarte a encontrar la solución tecnológica perfecta.',
        ],
      },
      agradecimientos: [
        '¡Es un honor ser de utilidad! Recuerda que mi función es simplificar la complejidad tecnológica para ti. ¿Qué otra inquietud tienes?',
        'No hay de qué. En Matt Innova creemos que el conocimiento se comparte. ¿Necesitas alguna aclaración adicional o pasamos a otro tema?',
        '¡Para eso estoy! ¿Viste que fácil es obtener información de calidad? Si tienes más preguntas, aquí estoy.',
      ],
      despedidas: {
        formal:
          'Ha sido un placer atenderle. Recuerde que la innovación es un camino continuo. En Matt Innova Solution estaremos aquí para guiarle. ¡Mucho éxito en sus proyectos!',
        casual:
          '¡Genial charla! Nos vemos pronto. Sigue innovando. ¡Hasta la próxima! 🚀',
        inspirador:
          'Recuerda: "La tecnología no es el futuro, es el presente bien aplicado". Esa es nuestra filosofía en MIS. ¡Hasta pronto, visionario!',
      },
    },

    EMPRESA: {
      historia: {
        resumen:
          '🏛️ *30 AÑOS DE LIDERAZGO TECNOLÓGICO*\n\nMatt Innova Solution nació en una época donde los mainframes dominaban. Hemos evolucionado desde el ensamblaje de PCs y cableado estructurado hasta convertirnos en arquitectos de la nube y desarrolladores de inteligencia artificial. Con más de 4,000 clientes y 50 macroproyectos, no solo hemos visto la historia, la hemos escrito.',
        hitos: [
          '📅 *1994-2000 (Fundación)*: Iniciamos como proveedores de hardware y redes para pymes en Cañete. Fuimos pioneros en llevar internet a zonas rurales de Lima Provincias.',
          '📅 *2001-2010 (Expansión)*: Desarrollamos el primer sistema de facturación electrónica adaptado a la legislación peruana. Abrimos nuestra división de consultoría TI.',
          '📅 *2011-2020 (Innovación)*: Lanzamiento de nuestro ERP en la nube. Nos convertimos en partners estratégicos de universidades para implementar repositorios DSpace, cumpliendo estándares de SUNEDU y CONCYTEC.',
          '📅 *2021-Presente (Disrupción)*: Fundación de *MIS Academy* para formar a la nueva generación de developers. Migración completa de nuestra infraestructura a microservicios en la nube con NestJS y Angular.',
        ],
        clientes:
          '🌎 *CONFIANZA QUE RESPALDA*\n\nMás de 4,000 empresas e instituciones han confiado en nosotros. Desde pequeños emprendimientos en Cañete hasta entidades gubernamentales, nuestro denominador común es la excelencia operativa. Casos destacados incluyen la automatización completa de la gestión de inventarios para cadenas de retail y la digitalización de archivos históricos para municipalidades.',
      },
      liderazgo: {
        pedro: {
          titulo: '👔 Ing. Pedro Alex Taya Yactayo - CEO & Fundador',
          perfil:
            'Con más de 30 años de experiencia, el Ing. Taya es un visionario que entendió antes que nadie el potencial de la tecnología para transformar empresas. Su liderazgo ha guiado a MIS a través de cuatro revoluciones tecnológicas. Es Ingeniero de profesión y estratega por vocación. Su enfoque: "tecnología con propósito, no por moda".',
          frase:
            '"No vendemos software, vendemos productividad y tranquilidad."',
        },
        giovanni: {
          titulo:
            '💻 Giovanni Risco - Lead Web Developer & Arquitecto de Software',
          perfil:
            'Giovanni es el cerebro detrás de la robustez técnica de nuestras soluciones. Experto en arquitecturas de microservicios con NestJS y frontends de alto rendimiento con Angular. Es el responsable de que nuestros sistemas sean escalables, seguros y ultrarrápidos. Un apasionado del código limpio y las buenas prácticas.',
          frase:
            '"Un sistema no está completo hasta que es a prueba de fallos y de usuarios."',
        },
        equipo:
          '👥 *EL TALENTO DETRÁS DE MIS*\n\nNo somos solo dos líderes. Contamos con un equipo multidisciplinario de ingenieros de software, administradores de redes, consultores funcionales y diseñadores UX/UI. Cada proyecto es un esfuerzo colectivo donde la experiencia senior se combina con el talento joven.',
      },
      ubicacion: {
        fisica:
          '📍 *CASA MATRIZ*\n\nUrb. Libertad Mz. I Lt. 5, Calle Las Moras, San Vicente de Cañete, Lima, Perú. Nuestra oficina principal es un centro de innovación donde se gestan las soluciones que transforman el país.',
        virtual:
          '🌐 *PRESENCIA SIN FRONTERAS*\n\nAunque nuestro corazón está en Cañete, operamos 100% remoto con clientes en toda Latinoamérica. Usamos herramientas de colaboración de última generación, lo que nos permite implementar soluciones en cualquier ciudad sin perder eficiencia.',
      },
      valores: {
        innovacion:
          '🚀 *INNOVACIÓN CONSTANTE*\n\nNo nos dormimos en los laureles. Cada año invertimos un porcentaje significativo en I+D para mantenernos a la vanguardia.',
        compromiso:
          '🤝 *COMPROMISO REAL*\n\nEl project manager de MIS no desaparece tras la firma del contrato. Somos partners de largo plazo. Nuestro soporte post-implementación es nuestra mayor carta de presentación.',
      },
    },

    SOFTWARE: {
      erp: {
        definicion:
          '📊 *ERP MIS: EL CEREBRO DE SU EMPRESA*\n\nNuestro sistema ERP (Enterprise Resource Planning) es una suite modular que integra todas las áreas de su negocio en una sola plataforma. Dígale adiós a las islas de información y a los errores de digitación.',
        modulos: [
          '🧾 *Módulo de Ventas*: Facturación electrónica ilimitada, cotizaciones automáticas, seguimiento de comisiones por vendedor.',
          '📦 *Módulo de Inventario*: Control multi-almacén en tiempo real, sistema de códigos de barra, alertas de stock mínimo.',
          '💰 *Módulo Financiero*: Cuentas por cobrar y pagar, flujo de caja proyectado, conciliación bancaria automática.',
          '👥 *Módulo de RRHH*: Control de asistencia, planilla electrónica, gestión de expedientes digitales.',
          '📈 *Business Intelligence*: Tableros de control (dashboards) personalizados con indicadores clave (KPIs) para la toma de decisiones.',
        ],
        beneficios:
          '⭐ *VENTAJAS COMPETITIVAS*\n\n- Acceso 100% web y App Móvil.\n- Actualizaciones automáticas sin costo.\n- Soporte personalizado 24/7.\n- Respaldo diario en la nube.',
        precio:
          '💲 *INVERSIÓN INTELIGENTE*\n\nNuestro ERP tiene planes desde 1 hasta 1,000 usuarios. El costo varía según los módulos y el nivel de personalización. Agendemos una llamada con un consultor para darte un presupuesto a tu medida sin compromiso.',
      },
      dspace: {
        definicion:
          '📚 *REPOSITORIO DIGITAL ACADÉMICO*\n\nUn repositorio DSpace es una biblioteca digital que almacena, preserva y difunde la producción científica (tesis, artículos, investigaciones) de una universidad o instituto. MIS es líder en su implementación a nivel nacional.',
        caracteristicas: [
          '🔍 *Búsqueda Avanzada*: Motor Apache SOLR que indexa texto completo de PDFs, permitiendo búsquedas semánticas.',
          '📊 *Estadísticas y Reportes*: Cumplimos con los indicadores que exige SUNEDU y CONCYTEC. Reportes de visitas, descargas por país y autor.',
          '🔒 *Protocolos de Interoperabilidad*: Cumplimiento del protocolo OAI-PMH para que tus investigaciones sean visibles en redes globales como ALICIA y La Referencia.',
          '🛡️ *Seguridad y Preservación*: Backups incrementales y políticas de embargo para documentos confidenciales.',
        ],
        proceso:
          '⚙️ *NUESTRA METODOLOGÍA DE IMPLEMENTACIÓN*\n\n1. Diagnóstico y análisis de la colección digital.\n2. Instalación y personalización del theme (acorde a la imagen institucional).\n3. Migración masiva de datos (tesis, metadata).\n4. Capacitación al personal bibliotecario.\n5. Soporte y mantenimiento continuo.',
      },
      desarrollo: {
        definicion:
          '💻 *FÁBRICA DE SOFTWARE A LA MEDIDA*\n\nNo toda empresa encaja en un software de caja. Si tu proceso de negocio es único, nosotros lo automatizamos. Construimos la herramienta que necesitas, desde cero.',
        stack: {
          frontend:
            '🖥️ *Frontend*: Creamos interfaces de usuario rápidas, reactivas y hermosas con Angular. Implementamos Progressive Web Apps (PWA) para que tu sistema funcione offline.',
          backend:
            '⚙️ *Backend*: Usamos NestJS, el framework progresivo de Node.js, para construir APIs robustas, escalables y mantenibles. Arquitectura limpia y orientada a microservicios.',
          movil:
            '📱 *Desarrollo Móvil*: Apps híbridas con Ionic + Angular, o nativas según el requerimiento. Geolocalización, notificaciones push y sincronización en tiempo real.',
        },
        saas: '☁️ *MODELO SAAS*\n\nOfrecemos Software como Servicio. Te olvidas de la infraestructura, servidores y actualizaciones. Pagas una suscripción mensual y te damos todo: hosting, soporte y evolución continua.',
      },
      consultoria: {
        definicion:
          '🛠️ *CONSULTORÍA TI EMPRESARIAL*\n\nSomos el departamento de tecnología externo que tu empresa necesita. Diagnosticamos, planificamos y ejecutamos soluciones TI alineadas a tus objetivos de negocio.',
        areas: [
          '🌐 *Redes y Conectividad*: Diseño de cableado estructurado, configuración de VPNs, firewalls Fortinet y redes Wi-Fi empresariales de alta densidad.',
          '☁️ *Migración a la Nube*: Llevamos tus servidores físicos a AWS, Google Cloud o Azure. Menos costos, más seguridad y disponibilidad.',
          '🛡️ *Ciberseguridad*: Auditorías de vulnerabilidades (pentesting), Ethical Hacking, y políticas de seguridad de la información.',
          '🎛️ *Automatización*: Implementación de soluciones IoT para la industria. Control de temperatura, humedad, trazabilidad de producción en tiempo real.',
          '💾 *Respaldo y Continuidad*: Sistemas de backup automático y planes de Disaster Recovery para que tu empresa nunca se detenga.',
        ],
      },
      hosting: {
        definicion:
          '🚀 *HOSTING DE ALTO RENDIMIENTO*\n\nOfrecemos servidores VPS y cloud hosting gestionado. Ideal para empresas que necesitan velocidad y uptime garantizado.',
        planes: [
          'Plan Start: 2GB RAM, 50GB SSD, 1TB transferencia. Ideal para páginas web.',
          'Plan Business: 8GB RAM, 200GB NVMe, ancho de banda ilimitado. Preparado para tiendas online.',
          'Plan Enterprise: Servidores dedicados a medida. Clúster de alta disponibilidad.',
        ],
      },
    },

    ACADEMY: {
      metodo: {
        proyecto:
          '🎓 *PROJECT-BASED LEARNING (ABP)*\n\nEn MIS Academy no enseñamos a copiar código. Aprendes construyendo un portafolio de proyectos reales. Desde el día uno, te enfrentas a retos de la industria.',
        teoria:
          '📖 *MENTORÍA INVESIVA*\n\nClases en vivo con profesionales de MIS. Resuelves dudas al instante. Te llevamos de "no sé nada" a "soy contratable".',
        certificacion:
          '🏅 *CERTIFICACIÓN POR COMPETENCIAS*\n\nTu certificado no es un PDF de asistencia. Es la validación de que has completado un proyecto funcional que puedes mostrar en entrevistas de trabajo.',
      },
      especialidad: {
        frontend: {
          titulo: '🅰️ FRONTEND MASTERY CON ANGULAR',
          ruta: [
            'Nivel 0: HTML5 semántico y CSS3 con Flexbox y Grid.',
            'Nivel 1: TypeScript desde las bases hasta Programación Reactiva (RxJS).',
            'Nivel 2: Angular Core: Componentes, Directivas, Pipes y Servicios.',
            'Nivel 3: Angular Pro: Lazy Loading, Guards, Interceptors y State Management con Signal Store.',
            'Proyecto Final: Un dashboard empresarial con gráficos dinámicos y modo oscuro.',
          ],
        },
        backend: {
          titulo: '⚙️ BACKEND PRO CON NESTJS',
          ruta: [
            'Fundamentos de Node.js y Express.',
            'Arquitectura de NestJS: Módulos, Controladores, Providers.',
            'TypeORM y Prisma: Modelado de bases de datos SQL y NoSQL.',
            'Microservicios con NATS y gRPC.',
            'Proyecto Final: API REST para un sistema de inventarios desplegado en la nube.',
          ],
        },
        redes: {
          titulo: '🌐 NETWORKING & ETHICAL HACKING',
          ruta: [
            'Fundamentos de Redes: Modelo OSI, TCP/IP.',
            'Subnetting y VLANs a fondo.',
            'Laboratorio de Hacking: Uso de Kali Linux, Nmap, Metasploit y Wireshark.',
            'Hardening de servidores Windows y Linux.',
          ],
        },
      },
      testimonios: [
        '"Gracias a MIS Academy pasé de ser soporte técnico a desarrollador Angular Senior en 8 meses." - *Carlos M., Ex-alumno.*',
        '"El enfoque práctico fue la clave. Salí con un portafolio que impresionó en mi entrevista." - *Ana R., Ex-alumna.*',
      ],
    },

    CONTACTO: {
      canales: {
        whatsapp:
          '📲 *WhatsApp Business*: Puedes escribirnos directamente a nuestro número principal para soporte rápido o cotizaciones.',
        email:
          '✉️ *Correo Electrónico*: Nuestro equipo de atención al cliente revisa los correos en horario de oficina.',
        rrss: '🌐 *Redes Sociales*: Síguenos en LinkedIn, Facebook e Instagram como @mattinnovasolution. Publicamos tips tecnológicos y casos de éxito.',
      },
      soporte:
        '🛟 *SOPORTE TÉCNICO*\n\nContamos con un SLA (Acuerdo de Nivel de Servicio) que garantiza respuestas en menos de 15 minutos para incidencias críticas. Tu negocio no se detiene.',
    },

    FAQ: {
      garantia:
        '🔒 *GARANTÍA DE SERVICIO*\n\nTodos nuestros desarrollos incluyen 3 meses de garantía sobre errores de programación. Además, el soporte continuo es parte de nuestro compromiso.',
      facturacion:
        '🧾 *FACTURACIÓN ELECTRÓNICA*\n\nEmitimos facturas y boletas electrónicas autorizadas por SUNAT. Todo en regla.',
      privacidad:
        '🛡️ *PRIVACIDAD Y CONFIDENCIALIDAD*\n\nFirmamos acuerdos de confidencialidad (NDA) con nuestros clientes. Tus datos y secretos comerciales están seguros.',
      metodologiaAgil:
        '🔄 *METODOLOGÍA SCRUM*\n\nGestionamos proyectos con SCRUM. Entregas cada 2 semanas (sprints) para que veas avances tangibles rápidamente.',
      clientesTipicos:
        '👥 *TIPOS DE CLIENTES*\n\nTrabajamos con pymes, startups, universidades y entidades gubernamentales. Cada solución se adapta a las regulaciones y necesidades del sector.',
    },
  };

  // ==========================================
  // RESPUESTAS DE SEGUIMIENTO (CONTEXTO)
  // ==========================================
  private getFollowUp(topic: string | null): string {
    const followUps: Record<string, string[]> = {
      erp: [
        '\n\n💡 *DATO CLAVE*: ¿Sabías que nuestro ERP reduce en un 40% el tiempo de cierre contable mensual?',
        '\n\n🤔 *PARA PROFUNDIZAR*: ¿Te preocupa más la gestión del inventario o la parte de facturación?',
      ],
      dspace: [
        '\n\n📈 *ESTADÍSTICA*: Las universidades que usan nuestro repositorio aumentan un 70% la visibilidad de sus investigaciones.',
        '\n\n❓ *PREGUNTA*: ¿Tu institución ya usa el protocolo OAI-PMH?',
      ],
      desarrollo: [
        '\n\n⚡ *TIP*: Podemos hacer un prototipo de tu idea en solo 2 semanas con nuestro modelo de desarrollo acelerado.',
      ],
    };
    if (topic && followUps[topic]) {
      const options = followUps[topic];
      return options[Math.floor(Math.random() * options.length)];
    }
    return '';
  }

  // ==========================================
  // LÓGICA DE DETECCIÓN DE ESTADO DE ÁNIMO
  // ==========================================
  private detectMood(
    input: string,
  ): 'curious' | 'skeptical' | 'excited' | 'neutral' {
    if (
      this.match(['como', 'por que', 'explica', 'detalle', 'funciona'], input)
    )
      return 'curious';
    if (this.match(['caro', 'seguro', 'realmente', 'mentira', 'dudo'], input))
      return 'skeptical';
    if (this.match(['genial', 'wow', 'increible', 'justo', 'exacto'], input))
      return 'excited';
    return 'neutral';
  }

  // ==========================================
  // MOTOR DE INFERENCIA PRINCIPAL
  // ==========================================
  getReply(message: string, sessionId: string = 'default'): string {
    const input = this.normalize(message);
    const state = this.getState(sessionId);
    state.messageCount++;
    state.userMood = this.detectMood(input);

    // --- 1. SALUDOS Y CORTESÍA CON MEMORIA ---
    if (
      this.match(
        ['hola', 'buen', 'que tal', 'empezar', 'inicio', 'saludos', 'hey'],
        input,
      )
    ) {
      if (state.messageCount > 1 && state.lastTopic) {
        const template = this.rand(this.KNOWLEDGE.USUARIO.saludos.returning);
        return template.replace(
          '{lastTopic}',
          this.getTopicName(state.lastTopic),
        );
      }
      return (
        this.rand(this.KNOWLEDGE.USUARIO.saludos.casual) + this.getMainMenu()
      );
    }

    if (
      this.match(['como estas', 'como vas', 'tal todo', 'que haces'], input)
    ) {
      return this.rand(this.KNOWLEDGE.USUARIO.cortesia.status) + this.VOLVER;
    }

    if (
      this.match(
        ['gracias', 'amable', 'excelente', 'perfecto', 'te pasaste'],
        input,
      )
    ) {
      return this.rand(this.KNOWLEDGE.USUARIO.agradecimientos) + this.VOLVER;
    }

    if (
      this.match(['chau', 'adios', 'nos vemos', 'luego', 'bye', 'salir'], input)
    ) {
      const despedida =
        state.userMood === 'excited'
          ? this.KNOWLEDGE.USUARIO.despedidas.inspirador
          : this.KNOWLEDGE.USUARIO.despedidas.casual;
      this.conversations.delete(sessionId); // Limpiar estado
      return despedida;
    }

    // --- 2. EMPRESA Y EQUIPO (DETALLES) ---
    if (
      this.match(
        [
          'quienes',
          'nosotros',
          'empresa',
          'historia',
          'años',
          'experiencia',
          'fundacion',
        ],
        input,
      )
    ) {
      state.lastTopic = 'empresa';
      let respuesta = this.KNOWLEDGE.EMPRESA.historia.resumen + '\n\n';
      respuesta += this.KNOWLEDGE.EMPRESA.historia.hitos.join('\n\n');
      return respuesta + this.VOLVER;
    }

    if (this.match(['pedro', 'taya', 'ceo', 'fundador', 'dueño'], input)) {
      state.lastTopic = 'liderazgo';
      return (
        this.KNOWLEDGE.EMPRESA.liderazgo.pedro.titulo +
        '\n\n' +
        this.KNOWLEDGE.EMPRESA.liderazgo.pedro.perfil +
        '\n\n_' +
        this.KNOWLEDGE.EMPRESA.liderazgo.pedro.frase +
        '_' +
        this.VOLVER
      );
    }

    if (
      this.match(
        [
          'giovanni',
          'risco',
          'desarrollador',
          'programador',
          'tecnico',
          'arquitecto',
        ],
        input,
      )
    ) {
      state.lastTopic = 'liderazgo';
      return (
        this.KNOWLEDGE.EMPRESA.liderazgo.giovanni.titulo +
        '\n\n' +
        this.KNOWLEDGE.EMPRESA.liderazgo.giovanni.perfil +
        '\n\n_' +
        this.KNOWLEDGE.EMPRESA.liderazgo.giovanni.frase +
        '_' +
        this.VOLVER
      );
    }

    if (this.match(['equipo', 'talento', 'personal', 'empleados'], input)) {
      state.lastTopic = 'equipo';
      return this.KNOWLEDGE.EMPRESA.liderazgo.equipo + this.VOLVER;
    }

    if (
      this.match(
        [
          'donde',
          'ubicacion',
          'direccion',
          'cañete',
          'lima',
          'oficina',
          'sede',
        ],
        input,
      )
    ) {
      state.lastTopic = 'ubicacion';
      return (
        this.KNOWLEDGE.EMPRESA.ubicacion.fisica +
        '\n\n' +
        this.KNOWLEDGE.EMPRESA.ubicacion.virtual +
        this.VOLVER
      );
    }

    if (this.match(['valores', 'mision', 'vision', 'filosofia'], input)) {
      state.lastTopic = 'valores';
      return (
        this.KNOWLEDGE.EMPRESA.valores.innovacion +
        '\n\n' +
        this.KNOWLEDGE.EMPRESA.valores.compromiso +
        this.VOLVER
      );
    }

    // --- 3. SERVICIOS Y SOFTWARE (DETALLES) ---
    if (
      this.match(
        ['software', 'sistema', 'erp', 'gestion', 'administracion'],
        input,
      )
    ) {
      state.lastTopic = 'erp';
      let respuesta = this.KNOWLEDGE.SOFTWARE.erp.definicion + '\n\n';
      respuesta += this.KNOWLEDGE.SOFTWARE.erp.modulos.join('\n\n');
      return respuesta + this.VOLVER;
    }

    if (
      this.match(
        [
          'beneficios erp',
          'ventaja erp',
          'por que erp',
          'costo erp',
          'precio erp',
        ],
        input,
      )
    ) {
      state.lastTopic = 'erp';
      return (
        this.KNOWLEDGE.SOFTWARE.erp.beneficios +
        '\n\n' +
        this.KNOWLEDGE.SOFTWARE.erp.precio +
        this.VOLVER
      );
    }

    if (
      this.match(
        ['modulo', 'inventario', 'factura', 'ventas', 'financiero', 'rrhh'],
        input,
      )
    ) {
      state.lastTopic = 'erp';
      const moduloEspecifico = this.KNOWLEDGE.SOFTWARE.erp.modulos.find((m) =>
        m.toLowerCase().includes(input),
      );
      if (moduloEspecifico) {
        return moduloEspecifico + this.VOLVER;
      }
      return this.KNOWLEDGE.SOFTWARE.erp.definicion + this.VOLVER;
    }

    if (
      this.match(
        [
          'dspace',
          'concytec',
          'renati',
          'sunedu',
          'tesis',
          'investigacion',
          'repositorio',
          'biblioteca',
        ],
        input,
      )
    ) {
      state.lastTopic = 'dspace';
      let respuesta = this.KNOWLEDGE.SOFTWARE.dspace.definicion + '\n\n';
      respuesta += this.KNOWLEDGE.SOFTWARE.dspace.caracteristicas.join('\n\n');
      return respuesta + this.VOLVER;
    }

    if (
      this.match(
        [
          'proceso dspace',
          'implementar dspace',
          'metodologia dspace',
          'como dspace',
        ],
        input,
      )
    ) {
      state.lastTopic = 'dspace';
      return this.KNOWLEDGE.SOFTWARE.dspace.proceso + this.VOLVER;
    }

    if (
      this.match(
        [
          'web',
          'pagina',
          'crear',
          'app',
          'movil',
          'programar',
          'desarrollo',
          'sistema a medida',
          'saas',
        ],
        input,
      )
    ) {
      state.lastTopic = 'desarrollo';
      let respuesta = this.KNOWLEDGE.SOFTWARE.desarrollo.definicion + '\n\n';
      respuesta += '**Stack Tecnológico:**\n';
      respuesta += this.KNOWLEDGE.SOFTWARE.desarrollo.stack.frontend + '\n\n';
      respuesta += this.KNOWLEDGE.SOFTWARE.desarrollo.stack.backend + '\n\n';
      respuesta += this.KNOWLEDGE.SOFTWARE.desarrollo.stack.movil;
      return respuesta + this.VOLVER;
    }

    if (
      this.match(
        ['angular', 'nest', 'frontend', 'backend', 'tecnologia', 'stack'],
        input,
      )
    ) {
      state.lastTopic = 'desarrollo';
      if (input.includes('angular') || input.includes('frontend'))
        return this.KNOWLEDGE.SOFTWARE.desarrollo.stack.frontend + this.VOLVER;
      if (input.includes('nest') || input.includes('backend'))
        return this.KNOWLEDGE.SOFTWARE.desarrollo.stack.backend + this.VOLVER;
      return this.KNOWLEDGE.SOFTWARE.desarrollo.saas + this.VOLVER;
    }

    if (
      this.match(
        [
          'consultoria',
          'servicio',
          'hacen',
          'ofrecen',
          'soporte',
          'redes',
          'seguridad',
          'cloud',
          'automatizacion',
        ],
        input,
      )
    ) {
      state.lastTopic = 'consultoria';
      let respuesta = this.KNOWLEDGE.SOFTWARE.consultoria.definicion + '\n\n';
      respuesta += this.KNOWLEDGE.SOFTWARE.consultoria.areas.join('\n\n');
      return respuesta + this.VOLVER;
    }

    if (
      this.match(
        ['hosting', 'servidor', 'web hosting', 'vps', 'dominio'],
        input,
      )
    ) {
      state.lastTopic = 'hosting';
      let respuesta = this.KNOWLEDGE.SOFTWARE.hosting.definicion + '\n\n';
      respuesta += this.KNOWLEDGE.SOFTWARE.hosting.planes.join('\n\n');
      return respuesta + this.VOLVER;
    }

    // --- 4. ACADEMY Y APRENDIZAJE ---
    if (
      this.match(
        [
          'aprender',
          'estudiar',
          'curso',
          'clases',
          'academy',
          'capacitacion',
          'entrenamiento',
        ],
        input,
      )
    ) {
      state.lastTopic = 'academy';
      let respuesta = this.KNOWLEDGE.ACADEMY.metodo.proyecto + '\n\n';
      respuesta += this.KNOWLEDGE.ACADEMY.metodo.teoria + '\n\n';
      respuesta += this.KNOWLEDGE.ACADEMY.metodo.certificacion;
      return respuesta + this.VOLVER;
    }

    if (
      this.match(['frontend', 'angular', 'rxjs', 'interfaz', 'ux', 'ui'], input)
    ) {
      state.lastTopic = 'academy';
      let respuesta =
        this.KNOWLEDGE.ACADEMY.especialidad.frontend.titulo + '\n\n';
      respuesta += this.KNOWLEDGE.ACADEMY.especialidad.frontend.ruta.join('\n');
      return (
        respuesta + '\n\n' + this.KNOWLEDGE.ACADEMY.testimonios[0] + this.VOLVER
      );
    }

    if (this.match(['backend', 'nestjs', 'api', 'servidor', 'node'], input)) {
      state.lastTopic = 'academy';
      let respuesta =
        this.KNOWLEDGE.ACADEMY.especialidad.backend.titulo + '\n\n';
      respuesta += this.KNOWLEDGE.ACADEMY.especialidad.backend.ruta.join('\n');
      return (
        respuesta + '\n\n' + this.KNOWLEDGE.ACADEMY.testimonios[1] + this.VOLVER
      );
    }

    if (
      this.match(
        ['redes', 'hacking', 'ciberseguridad', 'nmap', 'wireshark', 'network'],
        input,
      )
    ) {
      state.lastTopic = 'academy';
      let respuesta = this.KNOWLEDGE.ACADEMY.especialidad.redes.titulo + '\n\n';
      respuesta += this.KNOWLEDGE.ACADEMY.especialidad.redes.ruta.join('\n');
      return respuesta + this.VOLVER;
    }

    if (
      this.match(
        ['testimonio', 'egresado', 'alumno', 'opinion', 'review'],
        input,
      )
    ) {
      return this.KNOWLEDGE.ACADEMY.testimonios.join('\n\n') + this.VOLVER;
    }

    // --- 5. CONTACTO Y FAQ ---
    if (
      this.match(
        [
          'contacto',
          'whatsapp',
          'email',
          'correo',
          'redes',
          'facebook',
          'linkedin',
          'instagram',
        ],
        input,
      )
    ) {
      return (
        this.KNOWLEDGE.CONTACTO.canales.whatsapp +
        '\n\n' +
        this.KNOWLEDGE.CONTACTO.canales.email +
        '\n\n' +
        this.KNOWLEDGE.CONTACTO.canales.rrss +
        this.VOLVER
      );
    }

    if (
      this.match(
        ['soporte', 'ayuda tecnica', 'problema', 'error', 'falla'],
        input,
      )
    ) {
      return this.KNOWLEDGE.CONTACTO.soporte + this.VOLVER;
    }

    if (this.match(['garantia', 'confianza', 'seguro', 'respaldo'], input)) {
      state.userMood = 'skeptical';
      return (
        this.KNOWLEDGE.FAQ.garantia +
        '\n\n' +
        this.KNOWLEDGE.FAQ.privacidad +
        this.VOLVER
      );
    }

    if (this.match(['factura', 'boleta', 'sunat', 'tributario'], input)) {
      return this.KNOWLEDGE.FAQ.facturacion + this.VOLVER;
    }

    if (this.match(['privacidad', 'confidencial', 'nda', 'secreto'], input)) {
      return this.KNOWLEDGE.FAQ.privacidad + this.VOLVER;
    }

    if (
      this.match(['metodologia', 'scrum', 'agil', 'sprint', 'proceso'], input)
    ) {
      return this.KNOWLEDGE.FAQ.metodologiaAgil + this.VOLVER;
    }

    if (this.match(['cliente', 'quienes son', 'tipo', 'rubro'], input)) {
      return this.KNOWLEDGE.FAQ.clientesTipicos + this.VOLVER;
    }

    // --- 6. FALLBACK INTELIGENTE CON CONTEXTO ---
    const followUp = this.getFollowUp(state.lastTopic);
    return (
      `🤔 *Interesante consulta...*\n\nNo tengo una respuesta exacta para "${message}", pero noto que estás en modo *${this.getMoodName(
        state.userMood,
      )}*. Basado en nuestro hilo sobre *${this.getTopicName(state.lastTopic)}*, te sugiero:\n\n` +
      `Podemos hablar de nuestro *ERP*, *DSpace* para universidades, o *MIS Academy*. ¿Qué prefieres explorar?` +
      followUp
    );
  }

  // ==========================================
  // HELPERS TÉCNICOS
  // ==========================================
  private normalize(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\sáéíóúüñ¿¡]/gi, '') // Mantiene signos de pregunta
      .trim();
  }

  private match(keywords: string[], input: string): boolean {
    return keywords.some((key) => input.includes(this.normalize(key)));
  }

  private rand(arr: string[]): string {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  private getMainMenu(): string {
    return (
      `\n\n*📋 MENÚ PRINCIPAL DE ASESORÍA:*\n` +
      `🏢 *Empresa:* ¿Quiénes somos? | Historia | Equipo | Ubicación.\n` +
      `📊 *ERP:* Módulos, beneficios y costo.\n` +
      `📚 *DSpace:* Implementación, características y SUNEDU.\n` +
      `💻 *Desarrollo:* Apps, SaaS, Stack Angular/NestJS.\n` +
      `🛠️ *Consultoría:* Redes, Cloud, Ciberseguridad.\n` +
      `🎓 *Academy:* Cursos, metodología y testimonios.\n` +
      `📞 *Contacto:* WhatsApp, Email, Soporte Técnico.\n\n` +
      `*Escribe tu interés y te daré todos los detalles.*`
    );
  }

  private getTopicName(topic: string | null): string {
    const names: Record<string, string> = {
      erp: 'nuestro ERP empresarial',
      dspace: 'implementación DSpace',
      desarrollo: 'desarrollo de software a medida',
      consultoria: 'servicios de consultoría TI',
      hosting: 'servicios de hosting',
      academy: 'MIS Academy',
      empresa: 'nuestra trayectoria empresarial',
      liderazgo: 'nuestro equipo líder',
      equipo: 'nuestro equipo de trabajo',
      ubicacion: 'nuestra ubicación',
      valores: 'nuestros valores corporativos',
    };
    return topic ? names[topic] || 'nuestros servicios' : 'nuestros servicios';
  }

  private getMoodName(mood: string): string {
    const names: Record<string, string> = {
      curious: 'curioso y explorador',
      skeptical: 'analítico y precavido',
      excited: 'entusiasta y motivado',
      neutral: 'atento',
    };
    return names[mood] || 'atento';
  }

  private readonly VOLVER = `\n\n¿Hay algo más en lo que pueda asesorarte? (Escribe *menu* si deseas ver las opciones).`;
}
