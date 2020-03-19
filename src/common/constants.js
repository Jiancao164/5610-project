// export const COURSES_API_URL = "https://wbdv-generic-server.herokuapp.com/api/jannunzi/courses"
export const COURSES_API_URL = "https://wbdv-generic-server.herokuapp.com/api/jannunzi/courses"
export const MODULES_API_URL = "https://wbdv-generic-server.herokuapp.com/api/jannunzi/modules"
export const LESSONS_API_URL = "https://wbdv-generic-server.herokuapp.com/api/jannunzi/lessons"
export const COURSES_MODULES_API_URL = (courseId) => `https://wbdv-generic-server.herokuapp.com/api/jannunzi/courses/${courseId}/modules`
export const MODULES_LESSONS_API_URL = (moduleId) => `https://wbdv-generic-server.herokuapp.com/api/jannunzi/modules/${moduleId}/lessons`
export const LESSONS_TOPICS_API_URL = (lessonId) => `https://wbdv-generic-server.herokuapp.com/api/jannunzi/lessons/${lessonId}/topics`
