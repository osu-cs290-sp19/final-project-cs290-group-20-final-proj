<template>
<f7-page>
    <f7-views>
      <f7-view classtbale>
    <f7-pages>
          <f7-page name="table">
            <token-table :week="$store.state.week" :course="$store.state.course" :start="$store.state.start" @change-title="changeTitle"></token-table>
            <f7-fab @click="showPopup">
              <f7-icon icon="icon-plus"></f7-icon>
            </f7-fab>
          </f7-page>
    </f7-pages>
      </f7-view>
    </f7-views>


  <f7-popup class="popup-course">
    <f7-view>
      <f7-pages>
        <f7-page>
          <token-form :current="$store.state.current"></token-form>
        </f7-page>
      </f7-pages>
    </f7-view>
  </f7-popup>
</f7-page>



</template>

<script>
  import Table from './table'
  import Form from './form'
  import Course from '../course.js'
  import F7Page from "framework7-vue/src/components/page";
  import axios from '../axios.js'
  export default {
    components: {
      F7Page,
      'token-table': Table,
      'token-form': Form
    },
    mounted() {
      const storage = localStorage.getItem('course');
      if (storage && storage !== 'undefined') this.updateTable(JSON.parse(storage));
      let uname={"username":this.$store.state.username}
      axios.getCourse(uname).then(data=>{
        //const data = data.data.info;
        console.log("-------------")
        console.log(data)
        if(data.data.info==200) {

          if (!data.data.course) {
            this.$f7.alert("You haven't added courses yet.！")
          } else {
            localStorage.setItem('course', JSON.stringify(data.data.course));
            this.updateTable(data.data.course);
          }
        }else{
          this.$f7.alert("get Error！")
        }
     //   localStorage.setItem('course', JSON.stringify(data));
      //  this.updateTable(data);
      });
      /*
      this.$http.get('http://localhost:3001/table/index/api').then(response => {
        const data = response.data.data;
        console.log(data)
        localStorage.setItem('course', JSON.stringify(data));
        this.updateTable(data);
      });
      */
    },
    methods: {
      updateTable(data) {
        this.changeTitle(data.week);
        this.$store.commit('init', data);
      },
      showPopup() {
        this.$store.commit('current', new Course());
        this.$f7.popup('.popup-course');
      },
      changeTitle(week) {
        if (week < 1) document.title = 'During the holidays';
        else document.title = 'Week' + ' ' + week ;
        if (window.token && token.changeTitle) token.changeTitle(document.title);
      }
    }
  }
</script>
