
// import home from "@/modules/index/home"
import blog from "@/modules/index/page/blog"
import about from "@/modules/index/page/about"

const detail = resolve => require(["@/modules/index/page/detail"], resolve);
const message = resolve => require(["@/modules/index/page/message"], resolve);
const link = resolve => require(["@/modules/index/page/link"], resolve);
const donate = resolve => require(["@/modules/index/page/donate"], resolve);
const search = resolve => require(["@/modules/index/page/SearchResult"], resolve);

const login = resolve => require(["@/modules/index/user/login"], resolve);
const person = resolve => require(["@/modules/index/user/person"], resolve);

const index = [
  {
    path: "/",
    component: blog,
    meta: {
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: "/about",
    component: about,
    name: "about"
  },
  {
    path: "/login",
    component: login,
    name: "login"
  },
  {
    path: "/blog",
    component: blog,
    name: "blog",
    meta: {
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: "/blog/:id",
    component: detail,
    name: "detail"
  },
  {
    path: "/message",
    component: message,
    name: "message",
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/link",
    component: link,
    name: "link",
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/donate",
    component: donate,
    name: "donate",
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/person",
    component: person,
    name: "person"
  },
  {
    path: "/search",
    component: search,
    name: "search"
  }
];
export default index
