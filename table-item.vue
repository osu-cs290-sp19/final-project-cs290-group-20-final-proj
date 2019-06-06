<template>
    <div v-if="course.length === 0" class="table-item table-item-null" @click="addCourse"></div>
    <div v-else class="table-item" :class="'table-item-' + color + (course.length > 1 ? ' table-item-multi' : '')" @click="showCourseList">
        <div>{{course[0].name}}</div>
        <div v-if="course[0].classroom" class="room">{{course[0].classroom}}</div>
    </div>
</template> 


<script>
  import Vue from 'vue'
  import Detail from './table-course'
  import Course from '../course.js'

  export default {
    name: 'token-table-item',
    props: ['course', 'week', 'no'],
    computed: {
      color() {
        if (this.course[0].valid) return this.week + 1;
        else return 'invalid';
      }
    },
    methods: {
      addCourse(e) {
        const el = e.target;
        const name = 'table-item-add';
        if (el.className.indexOf(name) > -1) {
          let course = new Course();
          course.period.week = this.week + 1;
          course.period.section = this.no + 1;

          this.$store.commit('current', course);
          this.$f7.popup('.popup-course');
          setTimeout(() => {
            el.className = el.className.replace(name, '');
          }, 800);
        }
        else el.className += ' ' + name;
      },
      showCourseList() {
        const self = this;

        if (this.course.length === 1) this.showCourseDetail(this.course[0]);
        else {
          let buttons = [{
            text: '该节次对应' + this.course.length + '门课程',
            label: true
          }];
          let courses = this.course.map(item => {
            return {
              text: item.name,
              onClick() {
                self.showCourseDetail(item)
              }
            }
          });
          const cancel = [{
            text: 'close',
            color: 'red'
          }];
          const groups = [buttons.concat(courses), cancel];
          this.$f7.actions(groups);
        }
      },
      showCourseDetail(course) {
        console.log("***************")
        console.log(course)
        const CourseConstructor = Vue.extend(Detail);
        const instance = new CourseConstructor({
          parent: this,
          propsData: {
            course
          }
        });

        /*
        let $main = document.querySelector('.view-main');
        document.addEventListener('click', e => {
          if (e.target.className === 'layui-m-layershade active-state') {
            $main.style.filter = '';
            if (location.hash === '#detail') history.back();
          }
        }, true);
        $main.style.filter = 'blur(4px)';


        location.href = '#detail';
        window.onhashchange = () => {
          if (location.hash === '') {
            this.$layer.close();
            $main.style.filter = '';
          }
        };
        */


        this.$store.commit('current', course.origin);
        this.$layer.open({
          title: course.name,
          anim: 'scale',  // 
          content: instance.$mount().$el.innerHTML
        });
      }
    }
  }
</script>

<style scoped> 
  div{
    font-size:20px;
  }
  .room {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size:20px;
  }
</style>
