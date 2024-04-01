<template>
  <div>
    <b-col lg="6" class="my-1">
      <b-form-group
        label="Pesquisar"
        label-for="filter-input"
        label-cols-sm="3"
        label-align-sm="right"
        label-size="sm"
        class="mb-0"
      >
        <b-input-group size="sm">
          <b-form-input
            id="filter-input"
            v-model="filter"
            type="search"
            placeholder="Digite para pesquisar"
            @input="fetchData"
          ></b-form-input>

          <b-input-group-append>
            <b-button :disabled="!filter" @click="filter = ''">Limpar</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </b-col>

    <b-table
      :items="items[0]"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      stacked="md"
      show-empty
      small
      @filtered="onFiltered"
    >
    </b-table>
  </div>
</template>

<script>
import countriesService from "@/services/countriesService";

export default {
  data() {
    return {
      items: [],
      fields: [
        {
          key: "country",
          label: "Country",
          class: "text-start",
        },
        {
          key: "region",
          label: "Region",
          class: "text-center",
        },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    sortOptions() {
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  mounted() {
    this.totalRows = this.items[0].length;
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    fetchData() {
      countriesService
        .getData({
          filter: this.filter,
          page: this.currentPage,
          limit: this.perPage,
        })
        .then((response) => {
          const array = Object.values(response.data);
          this.items = array.map(v => v.map(arr => arr[1]));
          console.log(this.items);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
  },
  watch: {
    currentPage: {
      handler: "fetchData",
      immediate: false,
    },
  },
};
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.container_input {
  display: flex;
  justify-content: end;
  padding: 5px;
  border: solid 1px #ddd;
  height: 1.5rem;
}
.input_search {
  border: solid 1px;
  border-radius: 3px;
}
</style>
@/services/countriesService
