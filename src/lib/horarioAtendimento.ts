import { lojaConfig } from "@/config/loja";

export interface StatusHorario {
  aberto: boolean;
  mensagem: string;
  horarioAtualFormatado: string;
}

export function verificarStatusAtendimento(): StatusHorario {
  try {
    // Obtém data e hora no fuso horário da loja (America/Fortaleza)
    const agora = new Date();
    const formatter = new Intl.DateTimeFormat("pt-BR", {
      timeZone: lojaConfig.fusoHorario,
      hour: "numeric",
      minute: "numeric",
      weekday: "narrow",
      hour12: false,
    });

    const partes = formatter.formatToParts(agora);
    let hora = 0;
    let minuto = 0;

    for (const p of partes) {
      if (p.type === "hour") hora = parseInt(p.value, 10);
      if (p.type === "minute") minuto = parseInt(p.value, 10);
    }

    // Dia da semana no fuso de Fortaleza
    const diaSemanaFormat = new Intl.DateTimeFormat("en-US", {
      timeZone: lojaConfig.fusoHorario,
      weekday: "short",
    }).format(agora);

    const isDomingo = diaSemanaFormat === "Sun";
    const isSabado = diaSemanaFormat === "Sat";

    const horaDecimal = hora + minuto / 60;
    const config = lojaConfig.horarioAtendimento;

    let aberto = false;
    let mensagem = "";

    if (isDomingo) {
      aberto = false;
      mensagem = "Fechado hoje (Domingo) · Atendimento retorna na segunda-feira às 09:00";
    } else if (isSabado) {
      if (horaDecimal >= config.horaAberturaSabado && horaDecimal < config.horaFechamentoSabado) {
        aberto = true;
        mensagem = `Aberto agora · Fecha hoje às ${config.horaFechamentoSabado}:00`;
      } else {
        aberto = false;
        mensagem = "Fechado agora · Atendimento aos sábados das 09:00 às 14:00";
      }
    } else {
      // Segunda a Sexta
      if (horaDecimal >= config.horaAberturaSemana && horaDecimal < config.horaFechamentoSemana) {
        aberto = true;
        mensagem = `Aberto agora · Fecha às ${config.horaFechamentoSemana}:00`;
      } else {
        aberto = false;
        mensagem = "Fechado no momento · Horário de atendimento: 09:00 às 19:00";
      }
    }

    const horarioAtualStr = `${String(hora).padStart(2, "0")}:${String(minuto).padStart(2, "0")}`;

    return {
      aberto,
      mensagem,
      horarioAtualFormatado: `${horarioAtualStr} (Horário de Brasília/Fortaleza)`,
    };
  } catch {
    return {
      aberto: true,
      mensagem: "Atendimento no WhatsApp disponível",
      horarioAtualFormatado: "Horário comercial",
    };
  }
}
