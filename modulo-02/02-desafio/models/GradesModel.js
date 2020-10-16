import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();

const c_fail = 'fail';
const c_success = 'success';

class Grades {
  constructor(from = 'original') {
    this.gradesFileName = `${__dirname}/models/data/grades.json`;

    //Carrega base de dados
    let rawdata = null;
    if (from === 'original') {
      rawdata = fs.readFileSync(
        `${__dirname}/models/data/grades.original.json`
      );
      console.log('Loaded ORIGINAL file');
    } else {
      rawdata = fs.readFileSync(this.gradesFileName);
      console.log('Loaded SAVED file');
    }
    const originalData = JSON.parse(rawdata);

    this.nextId = originalData.nextId;
    this.grades = originalData.grades;
    this.updateGradesFile();
  }

  async updateGradesFile() {
    //delete grades file
    try {
      fs.unlinkSync(this.gradesFileName);
    } catch (err) {
      console.log('x');
    }

    this.grades = this.grades.sort((gradeA, gradeB) => {
      return gradeA.id - gradeB.id;
    });

    const newFile = {
      nextId: this.nextId,
      grades: this.grades,
    };

    //convert to JSON
    const jsonData = JSON.stringify(newFile);
    //write file to the disk
    fs.writeFileSync(this.gradesFileName, jsonData, 'utf8');
  }

  /* -------------------------------------------------------------------------*/
  /*                                CREATE!!!                                 */
  /* -------------------------------------------------------------------------*/
  addGrade(grade) {
    if (!grade.student || !grade.subject || !grade.type || !grade.value) {
      return {
        status: c_fail,
        message: 'Informar os campos: student, subject, type e value',
      };
    }
    const date = new Date();
    const timezoneOffset = date.getTimezoneOffset() * 60000;
    const newGrade = {
      id: grade.id ? parseInt(grade.id) : parseInt(this.nextId),
      student: grade.student,
      subject: grade.subject,
      type: grade.type,
      value: parseInt(grade.value, 10),
      timestamp: new Date(Date.now() - timezoneOffset).toISOString(),
    };
    if (!grade.id) this.nextId++;

    this.grades.push(newGrade);

    this.updateGradesFile();
    return {
      status: c_success,
      grade: newGrade,
    };
  }

  /* -------------------------------------------------------------------------*/
  /*                                READ                                      */
  /* -------------------------------------------------------------------------*/
  getGrades(queryObj = {}) {
    //Get grade by ID
    if (queryObj.id) {
      const grade = this.grades.find((grade) => {
        return grade.id === parseInt(queryObj.id);
      });
      if (grade) {
        return {
          status: c_success,
          grade,
        };
      } else {
        return {
          status: c_fail,
          message: `Nenhuma nota encontrada para o ID ${queryObj.id}`,
        };
      }
    }

    //Filter by query options, or return the entire grades list
    let grades = this.grades;
    if (queryObj !== null)
      grades = grades.filter((grade) => {
        let accept = true;
        if (queryObj.student) accept = grade.student === queryObj.student;
        if (!accept) return accept;

        if (queryObj.subject) accept = grade.subject === queryObj.subject;
        if (!accept) return accept;

        if (queryObj.type) accept = grade.type === queryObj.type;
        return accept;
      });

    if (grades.length < 1) {
      return {
        status: c_fail,
        message: 'Nenhuma nota encontrada',
      };
    }
    return {
      status: c_success,
      grades,
    };
  }

  /* -------------------------------------------------------------------------*/
  /*                                DELETE!!!                                 */
  /* -------------------------------------------------------------------------*/
  deleteGrade(id) {
    let deletedGrade = null;
    this.grades = this.grades.filter((curr) => {
      if (curr.id === parseInt(id)) deletedGrade = curr;
      return curr.id !== parseInt(id);
    });
    if (deletedGrade !== null) {
      this.updateGradesFile();
      return {
        status: c_success,
        grade: deletedGrade,
      };
    }
    return {
      status: c_fail,
      message: `Nota ${id} não existe.`,
    };
  }

  /* -------------------------------------------------------------------------*/
  /*                                UPDATE!!!                                 */
  /* -------------------------------------------------------------------------*/
  updateGrade(grade) {
    let result = this.deleteGrade(grade.id);
    if (result.status === c_fail) return result;

    //Fill required fields that might be missing with the deleted info
    if (!grade.student) grade.student = result.grade.student;
    if (!grade.subject) grade.subject = result.grade.subject;
    if (!grade.type) grade.type = result.grade.type;
    if (!grade.value) grade.value = result.grade.value;

    result = this.addGrade(grade);
    return result;
  }

  /* -------------------------------------------------------------------------*/
  /*                            GRADES AVERAGE!!!                             */
  /* -------------------------------------------------------------------------*/
  gradesAverage(subject, type) {
    const grades = this.getGrades({ subject, type });
    if (grades.status === c_fail) return grades;

    let scoreSum = 0;
    grades.grades.forEach((grade) => {
      scoreSum += grade.value;
    });
    const scoreAverage = scoreSum / grades.grades.length;
    return {
      status: c_success,
      scoreSum,
      scoreAverage,
      scoreTotalCount: grades.grades.length,
    };
  }

  /* -------------------------------------------------------------------------*/
  /*                               TOP GRADES                                 */
  /* -------------------------------------------------------------------------*/
  topGrades(subject, type) {
    const grades = this.getGrades({ subject, type });
    if (grades.status === c_fail) return grades;
    const sortedGrades = grades.grades.sort((gradeA, gradeB) => {
      return gradeB.value - gradeA.value;
    });

    let topGrades = [];
    for (let i = 0; i < 3; i++) topGrades.push(sortedGrades[i]);
    return {
      status: c_success,
      grades: topGrades,
    };
  }

  /* -------------------------------------------------------------------------*/
  /*                              TOTAL SCORE                                 */
  /* -------------------------------------------------------------------------*/
  totalScore(subject, student) {
    const grades = this.getGrades({ subject, student });
    if (grades.status === c_fail) return grades;

    let totalGrade = 0;
    for (let i = 0; i < grades.grades.length; i++)
      totalGrade += grades.grades[i].value;

    return {
      status: c_success,
      subject,
      student,
      totalGrade,
    };
  }
}

export default Grades;
