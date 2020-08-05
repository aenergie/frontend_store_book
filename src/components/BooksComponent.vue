<template>
  <b-container fluid="md">
    <b-col md="8" offset="2">
      <b-card
        border-variant="primary"
        header="List Books"
        header-bg-variant="primary"
        header-text-variant="white"
        align="center" >
        <b-table striped hover :items="items" :fields="fields">
          <template v-slot:cell(actions)="row">
          <b-button size="sm" @click="get(row.item)" class="mr-1" variant="outline-warning" v-b-modal.edit-book>
            Edit
          </b-button>
          <b-button size="sm" @click="destroy(row.item)" class="mr-1" variant="outline-danger">
            Delete
          </b-button>
          </template>
        </b-table>
        <div>
          <b-button v-b-modal.add-book  block variant="outline-primary">Add Book</b-button>
        </div>
      </b-card>
      <b-modal id="add-book" title="Add Book" hide-footer>
        <b-form @submit.stop.prevent="add(book)">
          <b-form-group label-cols="4" label-cols-lg="2" label="Title" label-align="left" label-for="title">
            <b-form-input id="title" size="lg" v-model="book.title" placeholder="Enter title" ></b-form-input>
            <b-alert v-if="errors.title" :show="errors.title ? true: false" variant="danger" >{{errors.title[0]}}</b-alert>
          </b-form-group>
          <b-form-group label-cols="4" label-cols-lg="2" label="Author" label-align="left" label-for="author">
            <b-form-input  id="author" size="lg" v-model="book.author" placeholder="Enter author"></b-form-input>
          </b-form-group>
          <b-form-group label-cols="4" label-cols-lg="2" label="Publish date" label-align="left" label-for="publish_date">
            <b-form-datepicker v-model="book.publish_date" locale="en"></b-form-datepicker>
          </b-form-group>
          <div>
            <b-button type="submit" block variant="outline-primary">Add</b-button>
          </div>
        </b-form>
      </b-modal>
      <b-modal id="edit-book" title="Edit Book" hide-footer>
        <b-form @submit.stop.prevent="update(book)">
          <b-form-group label-cols="4" label-cols-lg="2" label="Title" label-align="left" label-for="title">
            <b-form-input id="title" size="lg" v-model="book.title" placeholder="Enter title" ></b-form-input>
            <b-alert v-if="errors.title" :show="errors.title ? true: false" variant="danger" >{{errors.title[0]}}</b-alert>
          </b-form-group>
          <b-form-group label-cols="4" label-cols-lg="2" label="Author" label-align="left" label-for="author">
            <b-form-input  id="author" size="lg" v-model="book.author" placeholder="Enter author"></b-form-input>
          </b-form-group>
          <b-form-group label-cols="4" label-cols-lg="2" label="Publish date" label-align="left" label-for="publish_date">
            <b-form-datepicker v-model="book.publish_date" locale="en"></b-form-datepicker>
          </b-form-group>
          <div>
            <b-button type="submit" block variant="outline-primary">Update</b-button>
          </div>
        </b-form>
      </b-modal>
    </b-col>
  </b-container>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "BooksComponent",
  props: {
    msg: String
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    }),
  },
  created: function () {
    this.list();
  },
  data() {
    return {
      errors: [],
      fields: [
        {
          key: 'title',
          label: 'Title',
          sortable: true
        },
        {
          key: 'author',
          label: 'Author',
          sortable: true
        },
        {
          key: 'publish_date',
          label: 'Publish date',
          sortable: true,
        },{
          key: 'actions',
          label: 'Actions'
        }
      ],
      items: [],
      book: {
        id: null,
        title: null,
        author: null,
        publish_date: null
      }
    }
  },
  methods: {
    list() {
      this.$http.get('/api/book')
      .then(response => {
        console.log(response);
        this.items = response.data.items
      })
      .catch(error => {
         console.log(error)
      })
    },
    get(item) {
      this.book = item;
    },
    reset() {
      return this.book = {
        title: null,
        author: null,
        publish_date: null
      }
    },
    add() {
      this.$http.post('/api/book', this.book)
      .then(response => {
        console.log(response);
        this.$bvModal.hide('add-book');
        this.reset();
        this.list();
      })
      .catch(error => {
        console.log(error);
         this.errors = error.errors || [];
      })
    },
    update() {
      this.$http.put(`/api/book/${this.book.id}`, this.book)
      .then(response => {
        console.log(response);
        this.$bvModal.hide('edit-book');
        this.reset();
        this.list();
      })
      .catch(error => {
        console.log(error);
         this.errors = error.errors || [];
      })
    },
    destroy(item) {
      this.$bvModal.msgBoxConfirm('Are you sure?',{
          title: 'Delete book',
      })
      .then(confirm => {
        if(confirm)
        {
          this.$http.delete(`/api/book/${item.id}`)
          .then(response => {
            console.log(response)
            this.list();
          })
          .catch(error => {
            console.log(error);
            this.errors = error.errors || [];
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
};
</script>
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
