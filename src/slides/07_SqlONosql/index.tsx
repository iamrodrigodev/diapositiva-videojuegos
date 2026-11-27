import { QuestionIcon } from '@phosphor-icons/react'
import Lead from '../../components/Lead'
import Quiz from '../../components/Quiz'
import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'
import { QUIZ_BASES_DATOS } from '../../data/quizBasesDatos'

export default function SqlONosql() {
  return (
    <Slide bloque="Bloque 1 · Contexto" titulo={<span className="inline-flex items-center gap-3"><QuestionIcon aria-hidden="true" /> Concurso</span>} interactiva>
      <Lead>5 preguntas al azar de un banco de {QUIZ_BASES_DATOS.length}. Responde rápido para sumar más puntos y mantén la <strong>racha</strong>. Teclas 1–4 para responder (1 = A … 4 = D).</Lead>
      <Reveal>
        <Quiz id="quiz-bd" preguntas={QUIZ_BASES_DATOS} porRonda={5} />
      </Reveal>
    </Slide>
  )
}
