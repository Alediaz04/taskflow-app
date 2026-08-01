import { View, Text, TextInput, StyleSheet, Pressable, Alert, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView  } from 'react-native'
import Header from '../components/Header'
import ProfileCard from '../components/ProfileCard'
import { name } from '../data'
import { textSize, colors } from '../theme'
import { useState } from 'react'
import type { Task } from '../types'

const categories = [ 'Trabajo', 'Estudio', 'Personal'] as const

const HomeScreen = () => {
  const [taskList, setTaskList] = useState<Task[]>([])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<(typeof categories)[number] >(categories[0])


  const [titleError, setTitleError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')

  const [titleFocused, setTitleFocused] = useState(false)
  const [descriptionFocused, setDescriptionFocused] = useState(false)

  const isButtonDisabled = title.trim().length < 5 || description.trim().length < 10 

  const handleAddTask = () => {
    let valid = true

    setTitleError('')
    setDescriptionError('')

    if(title.trim().length < 5) {
      setTitleError('El titulo debe tener al menos 5 caracteres ')
      valid = false
    }

    if(description.trim().length < 10){
      setDescriptionError('La descripcion debe tener al menos 10 caracteres')
      valid = false
    }

    if (!valid) return

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      category,
      done: false,
      time: 'today'
      

    }

    console.log(newTask)
    
    setTaskList((prev) => [newTask, ...prev])

    Alert.alert('Exito', 'tarea capturada correctamente')

    setTitle('')
    setDescription('')
    setCategory(categories[0])

    
  }

  return (
    <SafeAreaView style= {styles.container}> 
     <KeyboardAvoidingView
        style={{ flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
     >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
     {/* 
      <View style={styles.gretting}>
        <Text style={styles.grettingText}>Hola buenas noches { name.slice(0, 9)}</Text>
      </View> 
     */}

      <Header name={name} totalTasks={taskList.length} />
      
      <View style = {styles.form}>
        <Text style = {styles.formTitle}> Crear una nueva tarea</Text>

        <TextInput
          value={title}
          onChangeText= {setTitle}
          placeholder= "titulo"
          autoCapitalize="sentences"  // experiencia de usuario 
          onFocus={() => setTitleFocused(true)}
          onBlur= {() => setTitleFocused(false)}
          style= {[
            styles.input,
            titleFocused && styles.inputFocused,
            titleError && styles.inputError  
          ]}
        />
         {/* OTRA FORMA DE HACER LO ANTERIOR */}
        {titleError ? <Text style={styles.error}>{titleError}</Text> : null}

        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Descripcion"
          multiline
          autoCapitalize="sentences"
          onFocus={() => setDescriptionFocused(true)}
          onBlur= {() => setDescriptionFocused(false)}
          style= {[
            styles.input,
            descriptionFocused && styles.inputFocused,
            descriptionError && styles.inputError  
          ]}

        />
        {descriptionError ? 
          <Text style={styles.error} > {descriptionError} 
          </Text> : null}

        {/* Comienza Categoria */}

        <Text style={styles.categoryTitle}> Categoria </Text>

        <View style={styles.categories}>
          {categories.map((item) => (
            <Pressable
              key={item}
              onPress={() => setCategory(item)}
              style={[
                styles.categoryButton,
                category === item && styles.categoryButtonSelected
                
              ]}
            >
                <Text
                  style={[
                    styles.categoryText,
                    category === item && styles.categoryTextSelected
                  ]}
                  >
                  {item}
                  </Text>

            </Pressable>
          ))}
        </View>

        <Pressable
          disabled = {isButtonDisabled}
          onPress= {handleAddTask}
          style={({ pressed }) => [
            styles.button,
            isButtonDisabled && styles.buttonDisabled,
            pressed && !isButtonDisabled && styles.buttonPressed
          ]}
          >
          <Text style={ styles.buttonText}> Agregar Tarea</Text>
        </Pressable>
        
      </View>      
     </ScrollView>
     </KeyboardAvoidingView>
    </SafeAreaView>
  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },

  scrollContent: {
    gap: 20,
    paddingBottom: 30,
  },

  greeting: {
    width: '100%'
  },

  greetingText: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.text
  },

  form: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    marginHorizontal: 20,
    padding: 18,
    gap: 12
  },

  formTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text
  },

  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#fff',
    color: colors.text
  },

  inputFocused: {
    borderColor: colors.primary
  },

  inputError: {
    borderColor: colors.danger
  },

  textArea: {
    minHeight: 100,
    textAlignVertical: 'top'
  },

  error: {
    color: colors.danger,
    marginTop: -6
  },

  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text
  },

  categories: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap'
  },

  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.category
  },

  categoryButtonSelected: {
    backgroundColor: colors.categorySelected,
    borderColor: colors.categorySelected
  },

  categoryText: {
    color: colors.primary,
    fontWeight: '600'
  },

  categoryTextSelected: {
    color: '#fff'
  },

  button: {
    marginTop: 10,
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center'
  },

  buttonPressed: {
    opacity: 0.85
  },

  buttonDisabled: {
    backgroundColor: '#B8C0CC'
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16
  },

  section: {
    width: '100%'
  },

  sectionTitle: {
    fontSize: textSize.subtitle,
    fontWeight: '700',
    color: colors.text
  },

  taskContainer: {
    gap: 16,
    paddingBottom: 30
  }
})

export default HomeScreen
