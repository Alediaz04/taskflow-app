import { View, Text, StyleSheet } from 'react-native'
import type { Task } from '../types'
import { colors, shadow } from '../theme/'

type CardTask = {
  task: Task
}


const CardTask = ({ task }: CardTask) => {
  const taskSpanish: Record<Task['date'], string> = {
    today: 'Hoy',
    tomorrow: 'Mañana',
    nextWeek: 'Próxima semana'
  }

  return (
    <View style={styles.cardTask} key={task.id}>
      <View style={styles.headerTask}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{task.title}</Text>
        <Text style={{ fontSize: 16 }}>{task.description}</Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
        {/* Color condicional con un ternario: verde si está resuelta, rojo si no. */}
        <Text style={{ color: task.completed ? 'green' : 'red' }}>
          {task.completed ? 'Resuelta' : 'No Resuelta'}
        </Text>
        {/* Buscamos la traducción en el diccionario usando la clave de la tarea. */}
        <Text style={{ fontSize: 16 }}>{taskSpanish[task.date]}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardTask: {
    width: '100%',
    backgroundColor: colors.cardBackgroundColor,
    boxShadow: shadow.cardShadow,
    padding: 16
  },
  headerTask: {
    gap: 2
  }
})

export default CardTask