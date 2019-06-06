<template>
    <div>
    <f7-block-title>{{course.id ? 'edit' : 'Add to'}}Custom Courses</f7-block-title>
    <f7-list form>
        <f7-list-item>
            <f7-label>Course Name</f7-label>
            <f7-input type="text" placeholder="eg：OSU" required v-model.trim="course.name" />
        </f7-list-item>
        <f7-list-item>
            <f7-label>instructor</f7-label>
            <f7-input type="text" placeholder="optional" v-model.trim="course.teacher.name" />
        </f7-list-item>
        <f7-list-item>
            <f7-label>Place of class</f7-label>
            <f7-input type="text" placeholder="eg：link - 210" v-model.trim="course.classroom" />
        </f7-list-item>
        <f7-list-item>
            <f7-label>how many weeks</f7-label>
          <f7-input type="select" required v-model="course.time.start">
            <option value="" disabled>origination week</option>
            <option v-for="i in 11" :value="i" :key="i">week {{i}}</option>
          </f7-input>
          <f7-input type="select" required v-model="course.time.end">
            <option value="" disabled>Final week</option>
            <option v-for="i in 11" :value="i" :key="i">week {{i}}</option>
          </f7-input>
        </f7-list-item>
        <f7-list-item>
            <f7-label>Week day</f7-label>
            <f7-input type="select" required v-model="course.period.week">
                <option value="0">Make a choice</option>
                <option value="1">Monday</option>
                <option value="2">Tuesday</option>
                <option value="3">Wednesday</option>
                <option value="4">Thursday</option>
                <option value="5">Friday</option>
                <option value="6">Saturday</option>
                <option value="7">Sunday</option>
            </f7-input>
        </f7-list-item>
        <f7-list-item>
            <f7-label>Times</f7-label>
            <f7-input type="select" required v-model="course.period.section">
                <option value="0">Make a choice</option>
                <option value="1">（8:00-9:00）</option>
                <option value="2">（9:00-10:00）</option>
                <option value="3">（10:00-11:00）</option>
                <option value="4">（11:00-12:00）</option>
                <option value="5">（12:00-13:00）</option>
                <option value="6">（13:00-14:00）</option>
                <option value="7">（14:00-15:00）</option>
                <option value="8">（15:00-16:00）</option>
                <option value="9">（15:00-16:00）</option>
            </f7-input>
        </f7-list-item>
        <div class="button-area">
            <f7-button type="submit" class="btn-primary button-big button-fill" @click="addCourse" :disabled="!course.name || !course.classroom || !course.time.start || !course.time.end || !course.period.week || !course.period.section">{{course.id ? 'save' : 'add'}}</f7-button>
            <f7-button v-if="course.id" class="btn-danger button-big button-fill" @click="deleteCourse">Delete</f7-button>
            <f7-button class="btn-default button-big button-fill close-popup">Close</f7-button>
        </div>
    </f7-list>
    </div>
</template>

<script>
  import Course from '../course.js'
  import axios from '../axios.js'

  export default {
    name: 'token-form',
    props: ['current'],
    data() {
      return {
        course: new Course()
      }
    },
    watch: {
      current() {
        this.course = this.clone(this.current);
      }
    },
    computed: {
      calcWeek() {
        if (!this.course.time.start) return 11;
        let arr = [];
        for (let i = this.course.time.start; i <= 11; ++i) {
          arr.push(i);
        }
        return arr;
      }
    },
    methods: {
      addCourse() {
        if (this.course.time.start > this.course.time.end) return;
        if (this.course.id) {
          axios.editCourse( {
            course: this.course
          }).catch(() => {
            this.$f7.alert('网络请求错误');
          });
          this.$store.commit('edit', this.course);
        }
        else {
      //    console.log("---------------------------------")
          axios.addCourse({
            course: this.course,
            term: this.$store.state.term
          }).then(result => {

            console.log(result.data)
            this.course.id = result.data.data;
            this.$store.commit('add', this.course);
          }).catch(() => {
            this.$f7.alert('网络请求错误');
          });
        }
        this.closePopup();
      },
      deleteCourse() {
        this.$f7.confirm('Are you sure you want to delete the <b>' + this.course.name + '</b> ？', () => {
          axios.delCourse({
            id: this.course.id
          }).catch(() => {
            this.$f7.alert('error');
          });
          this.$store.commit('delete');
          this.closePopup();
        });
      },
      changeOdd(odd) {
        this.course.time.odd = odd;
      },
      closePopup() {
        this.$f7.closeModal('.popup-course');
      },
      clone(obj) {
        return JSON.parse(JSON.stringify(obj));
      }
    }
  }
</script>

<style scoped>
  .button-area {
    margin-top: 2rem;
    padding: 0 1rem;
  }
  .btn-primary {
    color: #fff;
    background: #45c8dc !important;
    width: 100%;
  }
  .btn-danger {
    color: #fff;
    background: #ff3b30 !important;
    width: 100%;
  }
  .btn-danger, .btn-primary {
    margin-bottom: 0.5rem;
  }
  .btn-default {
    color: #000000 !important;
    background-color: #F8F8F8 !important;
    border: 1px solid rgba(0, 0, 0, 0.2) !important;
    line-height: 40px !important;
    height: 42px !important;
  }
  .ios .btn-default {
    border: 0.5px solid rgba(0, 0, 0, 0.2) !important;
  }
  .buttons-row {
    width: 200px;
  }
  .buttons-row > .button.active {
    background: #45c8dc;
    color: #fff;
  }

  .buttons-row > .button {
    border-color: #45c8dc;
    color: #45c8dc;
  }
</style>
