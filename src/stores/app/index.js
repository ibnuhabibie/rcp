import dayjs from "dayjs";
import { ElMessage, ElMessageBox } from "element-plus";
import { defineStore } from "pinia";
import { $http, getDates, groupBy } from "../../utils";

export const useAppStore = defineStore("app", {
  state: () => ({
    dateFilter: null,
    roleFilter: 0,
    allDates: null,
    roles: [],
    users: [],
    projects: [],
    dialog: null,
    userLoads: [],
    detailLoad: null,
  }),
  getters: {
    dates({ allDates }) {
      if (!allDates) return [];
      return groupBy(allDates, "month");
    },
    filteredUsers({ roleFilter, users }) {
      if (roleFilter == 0) return users;
      return users.filter((user) => user.role_id === roleFilter);
    },
    parsedCapacity({ detailLoad }) {
      return JSON.parse(decodeURIComponent(detailLoad));
    },
  },
  actions: {
    async deleteCapacity(id) {
      console.log(id);
      
      await $http.delete(`/user/capacity/${id}`);
      await this.getCapacities();
      this.dialog = null;
    },
    async getCapacities() {
      if (!this.dateFilter) return;

      let start_date = dayjs(this.dateFilter[0]).format("YYYY-MM-DD");
      let end_date = dayjs(this.dateFilter[1]).format("YYYY-MM-DD");

      let endpoint = `/user/capacity?start_date=${start_date}&end_date=${end_date}`;
      if (this.roleFilter) endpoint += `&role_id=${this.roleFilter}`;

      let res = await $http.get(endpoint);
      this.userLoads = res.data;
    },
    async handleDateFilter(value) {
      if (!value) {
        this.allDates = null;
        return;
      }

      await this.getCapacities();

      this.allDates = getDates(value[0], value[1]);
    },
    async fetchData() {
      let saved_roles = localStorage.getItem("roles");

      if (saved_roles) {
        this.roles = JSON.parse(saved_roles);
      } else {
        let roles = await $http.get("/role");
        this.roles = roles.data;
        localStorage.setItem("roles", JSON.stringify(roles.data));
      }

      this.roles = [{ id: 0, name: "All" }].concat(this.roles);

      let saved_users = localStorage.getItem("users");

      if (saved_users) {
        this.users = JSON.parse(saved_users);
      } else {
        let users = await $http.get("/user");
        this.users = users.data;
        localStorage.setItem("users", JSON.stringify(users.data));
      }

      let saved_projects = localStorage.getItem("projects");

      if (saved_projects) {
        this.projects = JSON.parse(saved_projects);
      } else {
        let projects = await $http.get("/project");
        this.projects = projects.data;
        localStorage.setItem("projects", JSON.stringify(projects.data));
      }
    },
    async handleAddCapacity(form) {
      let formData = {
        user_id: form.user,
        project_id: form.project,
        assigned_hour: form.assigned_hour,
        start_date: form.start_date,
        end_date: form.end_date,
        include_weekend: form.include_weekend,
      };
      await $http.post("/user/capacity", formData);
      await this.getCapacities();
    },
  },
});
