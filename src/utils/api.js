import axios from 'axios';

const headers =  {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

const burl = "http://192.168.0.101:3001";

export default {

    login: function (send) {
        return fetch(burl + '/user/login', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(send)
        })
    },

    signup: function (send) {

        return fetch(burl+ '/user/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(send)
        })
    },


    isAuth: function () {
        return (sessionStorage.getItem('token') !== null);
    },
    logout: function () {
        sessionStorage.clear();
    },

    getStudent: function (studentId) {
        return axios.get(burl + "/student/" + studentId)
    },

    getAllCourses: function () {
        return axios.get(burl + "/course");
    },

    getCourse: function (courseId) {
        return axios.get(burl + "/course/" + courseId);
    },

    getWeek: function (weekId) {
        return axios.get(burl + "/week/" + weekId);
    },

    getLink: function (linkId) {
        return axios.get(burl + "/link/" + linkId);
    },

    getLecture: function (lectureId) {
        return axios.get(burl + "/lecture/" + lectureId);
    },

    getAllTeachers: function () {
        return axios.get(burl + "/teacher");
    },

    getTeacher: function (teacherId) {
        return axios.get(burl + "/teacher/" + teacherId);
    },

    patchTimeSpent: function (studentId, courses) {
        return axios.patch(burl + "/student/" + studentId, [{
                "propName": "courses", "value": courses
            }]
            , {
                headers: headers
            })
    },

    patchDoneArray: function (studentId, courses) {
        return axios.patch(burl + "/student/" + studentId, [{
                "propName": "courses", "value": courses
            }]
            , {
                headers: headers
            })
    },

    patchPercentage: function (studentId, courses) {
        return axios.patch(burl + "/student/" + studentId, [{
                "propName": "courses", "value": courses
            }]
            , {
                headers: headers
            })
    },

    patchQuizResult: function (studentId, courses) {
        return axios.patch(burl + "/student/" + studentId, [{
                "propName": "courses", "value": courses
            }]
            , {
                headers: headers
            })
    },

    patchGlobalScore: function (studentId, courses) {
        return axios.patch(burl + "/student/" + studentId, [{
                "propName": "courses", "value": courses
            }]
            , {
                headers: headers
            })
    },

    postCourse: function (course) {
        return axios.post(burl + '/course', course, {headers: headers})
    },

    postLecture: function (lecture) {
        return axios.post(burl + '/lecture', lecture, {headers: headers})
    },

    postLink: function (link) {
        return axios.post(burl + '/link', link, {headers: headers})
    },

    postQuiz: function (quiz) {
        return axios.post(burl + '/quiz', quiz, {headers: headers})
    },

    deleteCourse: function(courseId){
        return axios.delete(burl + '/course/' +courseId);
    }

}