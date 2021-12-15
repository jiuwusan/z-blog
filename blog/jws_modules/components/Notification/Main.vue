<template>
  <transition name="message-fade" @after-leave="$emit('destroy')">
    <div class="notice-item" v-show="visible">
      <img class="icon" :src="iconMap[type]" />
      <div class="content">
        <div class="title">{{ title }}</div>
        <div class="massage">{{ description }}</div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    duration: {
      type: Number,
      default: 2000,
    },
    description: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "系统提示",
    },
    type: {
      type: String,
      default: "success",
    },
  },
  data() {
    return {
      iconMap: {
        success: `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjI4Njc1OTcyODQ2IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjUzMTYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTExLjYgMTQ4LjJjNDkuNyAwIDk3LjkgOS43IDE0My4yIDI4LjkgNDMuOCAxOC41IDgzLjIgNDUuMSAxMTcgNzguOSAzMy44IDMzLjggNjAuNCA3My4yIDc4LjkgMTE3IDE5LjIgNDUuMyAyOC45IDkzLjUgMjguOSAxNDMuMnMtOS43IDk3LjktMjguOSAxNDMuMmMtMTguNSA0My44LTQ1LjEgODMuMi03OC45IDExNy0zMy44IDMzLjgtNzMuMiA2MC40LTExNyA3OC45LTQ1LjMgMTkuMi05My41IDI4LjktMTQzLjIgMjguOXMtOTcuOS05LjctMTQzLjItMjguOWMtNDMuOC0xOC41LTgzLjItNDUuMS0xMTctNzguOS0zMy44LTMzLjgtNjAuNC03My4yLTc4LjktMTE3LTE5LjItNDUuMy0yOC45LTkzLjUtMjguOS0xNDMuMnM5LjctOTcuOSAyOC45LTE0My4yYzE4LjUtNDMuOCA0NS4xLTgzLjIgNzguOS0xMTcgMzMuOC0zMy44IDczLjItNjAuNCAxMTctNzguOSA0NS4zLTE5LjIgOTMuNS0yOC45IDE0My4yLTI4LjltMC04MGMtMjQ3LjQgMC00NDggMjAwLjYtNDQ4IDQ0OHMyMDAuNiA0NDggNDQ4IDQ0OCA0NDgtMjAwLjYgNDQ4LTQ0OC0yMDAuNi00NDgtNDQ4LTQ0OHoiIGZpbGw9IiM1MkMwMUEiIHAtaWQ9IjUzMTciPjwvcGF0aD48cGF0aCBkPSJNMzk5LjkgNjYxLjVMMjg4LjggNTQxLjhjLTE1LTE2LjItMTQuMS00MS41IDIuMS01Ni41czQxLjUtMTQuMSA1Ni41IDIuMWw1OC45IDYzLjRjMTQuNiAxNS43IDM5IDE3LjEgNTUuMyAzLjJsMjE3LjUtMTg2LjJjMTYuOC0xNC40IDQyLTEyLjQgNTYuNCA0LjQgMTQuNCAxNi44IDEyLjQgNDItNC40IDU2LjRMNDU1LjMgNjY0LjdjLTE2LjMgMTQtNDAuOCAxMi42LTU1LjQtMy4yeiIgZmlsbD0iIzUyQzAxQSIgcC1pZD0iNTMxOCI+PC9wYXRoPjwvc3ZnPg==`,
        warning: `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjI4Njc1OTcyODQ2IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjUzMTYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTExLjYgMTQ4LjJjNDkuNyAwIDk3LjkgOS43IDE0My4yIDI4LjkgNDMuOCAxOC41IDgzLjIgNDUuMSAxMTcgNzguOSAzMy44IDMzLjggNjAuNCA3My4yIDc4LjkgMTE3IDE5LjIgNDUuMyAyOC45IDkzLjUgMjguOSAxNDMuMnMtOS43IDk3LjktMjguOSAxNDMuMmMtMTguNSA0My44LTQ1LjEgODMuMi03OC45IDExNy0zMy44IDMzLjgtNzMuMiA2MC40LTExNyA3OC45LTQ1LjMgMTkuMi05My41IDI4LjktMTQzLjIgMjguOXMtOTcuOS05LjctMTQzLjItMjguOWMtNDMuOC0xOC41LTgzLjItNDUuMS0xMTctNzguOS0zMy44LTMzLjgtNjAuNC03My4yLTc4LjktMTE3LTE5LjItNDUuMy0yOC45LTkzLjUtMjguOS0xNDMuMnM5LjctOTcuOSAyOC45LTE0My4yYzE4LjUtNDMuOCA0NS4xLTgzLjIgNzguOS0xMTcgMzMuOC0zMy44IDczLjItNjAuNCAxMTctNzguOSA0NS4zLTE5LjIgOTMuNS0yOC45IDE0My4yLTI4LjltMC04MGMtMjQ3LjQgMC00NDggMjAwLjYtNDQ4IDQ0OHMyMDAuNiA0NDggNDQ4IDQ0OCA0NDgtMjAwLjYgNDQ4LTQ0OC0yMDAuNi00NDgtNDQ4LTQ0OHoiIGZpbGw9IiM1MkMwMUEiIHAtaWQ9IjUzMTciPjwvcGF0aD48cGF0aCBkPSJNMzk5LjkgNjYxLjVMMjg4LjggNTQxLjhjLTE1LTE2LjItMTQuMS00MS41IDIuMS01Ni41czQxLjUtMTQuMSA1Ni41IDIuMWw1OC45IDYzLjRjMTQuNiAxNS43IDM5IDE3LjEgNTUuMyAzLjJsMjE3LjUtMTg2LjJjMTYuOC0xNC40IDQyLTEyLjQgNTYuNCA0LjQgMTQuNCAxNi44IDEyLjQgNDItNC40IDU2LjRMNDU1LjMgNjY0LjdjLTE2LjMgMTQtNDAuOCAxMi42LTU1LjQtMy4yeiIgZmlsbD0iIzUyQzAxQSIgcC1pZD0iNTMxOCI+PC9wYXRoPjwvc3ZnPg==`,
        error: `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjI4NzQ3Nzc1NTAwIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIzMzEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNjgzLjEgMzI4LjFjMTYgMTYgMTYgNDEuOSAwIDU3LjlMMzc1LjggNjkzLjNjLTE2IDE2LTQxLjkgMTYtNTcuOSAwcy0xNi00MS45IDAtNTcuOWwzMDcuMi0zMDcuMmMxNi0xNi4xIDQyLTE2LjEgNTgtMC4xeiIgZmlsbD0iI2ZmNGQ0ZiIgcC1pZD0iMjMzMiI+PC9wYXRoPjxwYXRoIGQ9Ik02ODMuMSA2OTMuM2MtMTYgMTYtNDEuOSAxNi01Ny45IDBMMzE3LjkgMzg2LjFjLTE2LTE2LTE2LTQxLjkgMC01Ny45czQxLjktMTYgNTcuOSAwTDY4MyA2MzUuNGMxNiAxNiAxNiA0MS45IDAuMSA1Ny45eiIgZmlsbD0iI2ZmNGQ0ZiIgcC1pZD0iMjMzMyI+PC9wYXRoPjxwYXRoIGQ9Ik0xMDguNSA2ODcuNG0tNDAuOSAwYTQwLjkgNDAuOSAwIDEgMCA4MS44IDAgNDAuOSA0MC45IDAgMSAwLTgxLjggMFoiIGZpbGw9IiNmZjRkNGYiIHAtaWQ9IjIzMzQiPjwvcGF0aD48cGF0aCBkPSJNMjUzLjYgODYyLjZtLTQwLjkgMGE0MC45IDQwLjkgMCAxIDAgODEuOCAwIDQwLjkgNDAuOSAwIDEgMC04MS44IDBaIiBmaWxsPSIjZmY0ZDRmIiBwLWlkPSIyMzM1Ij48L3BhdGg+PHBhdGggZD0iTTQ5OS4yIDQyLjZDMjM5LjkgNDIuNiAyOS44IDI1Mi43IDI5LjggNTEyYzAgNjkgMTQuOSAxMzQuNiA0MS43IDE5My42bDc0LjItMzUuNEMxMjQuMSA2MjEuOCAxMTIgNTY4LjMgMTEyIDUxMmMwLTIxMy44IDE3My4zLTM4Ny4yIDM4Ny4yLTM4Ny4yUzg4Ni4zIDI5OC4xIDg4Ni4zIDUxMiA3MTMgODk5LjEgNDk5LjIgODk5LjFjLTgxLjkgMC0xNTcuOS0yNS40LTIyMC40LTY4LjhsLTUxLjIgNTcuMmMxLjUgMC43IDIuNSAyLjEgMi41IDMuNnMwLjMgMy4yLTEuMiAzLjljNzYuNyA1NC41IDE2OS4yIDg2LjIgMjcwLjQgODYuMiAyNTkuMiAwIDQ2OS40LTIxMC4xIDQ2OS40LTQ2OS40Uzc1OC40IDQyLjYgNDk5LjIgNDIuNnoiIGZpbGw9IiNmZjRkNGYiIHAtaWQ9IjIzMzYiPjwvcGF0aD48L3N2Zz4=`,
        info: `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjI4NzQ3ODM5MDUxIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQ3NDkiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTEyIDk1OC43MDg5NzFjLTI0Ni4zMTI4NzIgMC00NDYuNzA4OTcxLTIwMC4zOTYwOTktNDQ2LjcwODk3MS00NDYuNzA4OTcxUzI2NS42ODYxMDUgNjUuMjkwMDA1IDUxMiA2NS4yOTAwMDUgOTU4LjcwODk3MSAyNjUuNjg2MTA1IDk1OC43MDg5NzEgNTEyIDc1OC4zMTI4NzIgOTU4LjcwODk3MSA1MTIgOTU4LjcwODk3MXpNNTEyIDEyOS41MjM5NTljLTIxMC44OTMxNzQgMC0zODIuNDc2MDQxIDE3MS41ODI4NjctMzgyLjQ3NjA0MSAzODIuNDc2MDQxUzMwMS4xMDY4MjYgODk0LjQ3NTAxOCA1MTIgODk0LjQ3NTAxOHMzODIuNDc2MDQxLTE3MS41ODI4NjcgMzgyLjQ3NjA0MS0zODIuNDc2MDQxUzcyMi44OTIxNTEgMTI5LjUyMzk1OSA1MTIgMTI5LjUyMzk1OXoiIGZpbGw9IiMxMjk2ZGIiIHAtaWQ9IjQ3NTAiPjwvcGF0aD48cGF0aCBkPSJNNjEyLjY1ODUzOCA2NDguMTY3MjYzbC0yLjQ0NjcyNi0zLjUzMDQwNy03LjY4MDkzNi0zLjQyMTkzNmgtMy41MzA0MDZjLTQuMTAzNDU4IDAtOC41OTQ3NDkgMS4wODM2ODEtMjIuNjM5NjI3IDcuOTc0NjI1bC0yMi41MDA0NTYgMTUuMTkwOTgxYy02LjE2MzM3MyAzLjkwMTg2Ny0xMi45OTE4OTUgNy4xODU2NTYtMjAuMzQ3NDIxIDkuNzU2MjAxLTcuNzQyMzM1IDIuNzQwNDE0LTE1LjkxODU1MSA0LjkwODgtMjQuMjY1NjYgNi40NDE3MTMtNS43NzU1NCAxLjA2ODMzMi0xMC4zOTA2NTEgMS44Mjc2MjUtMTUuMzkyNTcyIDEuNTYzNjEyLTYuOTg0MDY1LTAuODM2MDQxLTguOTUwODU5LTMuNTc3NDc4LTkuNjYzMDgtNC41OTg3MzgtMi4wOTA2MTUtMi45MjY2NTYtMi44MTgxODUtOC40MDg1MDctMi4wNzUyNjUtMTUuNDUzOTcxIDEuMDk5MDMxLTEwLjMyOTI1MyA0LjA0MjA1OS0yNC40OTc5NSA4LjczMzkxOC00Mi4xMjAzMDYgNC44MzEwMjktMTguMDQwODg4IDkuNTM5MjYtMzMuNzExNzk5IDE0LjA0NDg3OC00Ni45NjY2ODUgNC41MjE5OS0xMy4yMzk1MzYgOS44NDgyOTktMjcuMDY4NDk2IDE1Ljk5NjMyMy00MS41Nzc5NTQgNi4wNTQ5MDMtMTQuMzM5NTkgMTAuOTE3NjU0LTI0LjczMDI0MSAxNC40NDgwNi0zMC45MjQzMTMgMy4yMzY3MTgtNS43Mjk0OTEgOC4wOTg0NDUtMTIuMDc4MDgzIDE0LjQ5NDEwOS0xOC45NzAwNSA2LjA1NDkwMy02LjYxMjYwNSAyMC4yMzg5NS0yMi4wOTcyNzQgMTIuMDYyNzMzLTM2Ljk3OTIxNi00LjQ0NDIxOS04LjAyMTY5Ny0xMi4yNDg5NzUtMTIuODM3Mzc2LTI0LjQ5Nzk1LTEzLjYxMjAyLTUuOTc3MTMyIDAtMTIuNTg5NzM2IDEuMzAwNjIyLTIwLjE5MjkwMSAzLjk0ODkzOS03LjkyODU3NiAyLjc3MjEzNi0xMi45NjExOTYgNC44NzgxMDEtMTQuOTI3OTkxIDUuOTkyNDgxLTIuMDI4MTkzIDEuMDk5MDMxLTUuMTcxNzkgMy4xMjgyNDctMTkuMDMxNDQ5IDE0LjQ3ODc2LTEzLjc2NjUzOCAxMS4yMjY2OTItMTcuNjUzMDU1IDE1LjczMzMzMy0xOS42OTc2MjEgMTkuNjUwNTQ5LTEuOTk3NDk0IDMuNzc4MDQ2LTMuNTQ1NzU2IDkuMTA1Mzc5LTQuNjkxODU5IDIyLjc5NDE0NS0wLjQzMzg4MiA1LjA5NTA0Mi0yLjM4NDMwMyAxNS4yMzgwNTMtOS40MzA3OSAzNS4xNTE1OTFsLTE5Ljk2MDYxIDYzLjkzOTI0Mi0xNi4wNzQwOTQgNDQuMTE3OGMtNC4xNTA1MyAxNS4wNjcxNi01LjcxNDE0MiAyOC4xMjE0NzgtNC43ODQ5OCAzOS44NTk4MjMgMC44NjY3NCAxMS40MTI5MzQgMy4xNTg5NDYgMjIuMDY2NTc1IDYuODEzMTczIDMxLjYyMTE4NSA0LjAyNTY4NyAxMC42MDc1OTIgOS42MTYwMDggMTkuMjYzNzM5IDE2LjU4NDcyMyAyNS43MDU0NTEgNy42MzM4NjQgNy4wOTI1MzUgMTcuMDY0NjU0IDExLjUwNjA1NSAyNy40NzA2NTUgMTMuMDA3MjQ1IDIuODMzNTM1IDAuNTEwNjMgNS45NjE3ODIgMC43ODk5OTIgOS4zNjgzNjggMC43ODk5OTMgOC41NjMwMjYgMCAxOC41MzYxNjgtMS43MTkxNTQgMzAuNTIyMTU0LTUuMjgwMjYgMTQuODY1NTY5LTQuNDI4ODY5IDI3LjEyOTg5NC04Ljg4ODQzOCAzNy40Mjg0NDgtMTMuNjEyMDE5IDEwLjM0NDYwMi00LjY2MTE2IDIwLjA2OTA4MS0xMC4wOTY5NjIgMjguOTcyODY4LTE2LjE1MDg0MiA4LjA2Nzc0Ni01LjU1OTYyMyAxNi40MTQ4NTUtMTEuNTIxNDA0IDI0Ljk3Nzg4MS0xNy45NDc3NjcgMTAuOTc5MDUyLTguMjUzOTg4IDE3LjkzMjQxOC0xNi43MDg1NDQgMjEuMzIzNjU1LTI1LjkzNzc0M0M2MTQuOTE5MDIxIDY2NS4xMzg3OTYgNjE4LjE1NTczOCA2NTYuMTI2NTM4IDYxMi42NTg1MzggNjQ4LjE2NzI2M3oiIGZpbGw9IiMxMjk2ZGIiIHAtaWQ9IjQ3NTEiPjwvcGF0aD48cGF0aCBkPSJNNDgzLjgzNTU0NCAzNzYuMjI0NjY0YzUuMTYyNTggNC4zMTYzMDYgMTEuNTczNTkzIDYuNjc2MDUgMTkuMjI4OTQ2IDcuMTIxMTg4IDguOTkyODE1IDAuODkwMjc2IDIxLjUwMTcxLTQuNDk0MzYxIDM3LjQ4MDYzNi0xNi4yMDMwMzEgMTUuOTM1OTQ3LTExLjcwNjYyMyAyNC4zOTU2Mi0yMS4wMDk1IDI1LjI4NTg5Ny0yNy45OTk3MDQgMC44OTAyNzYtNi45ODgxNTgtMS40Njk0NjgtMTcuNzU5NDc5LTcuMDc4MjA5LTMyLjQwNTAzNy01LjY1MTcyLTE0LjYwMDUzMy0xMC45MDUzNzQtMjMuOTUwNDgyLTE1Ljg0NjkyLTI3Ljk5OTcwNS00Ljk4NDUyNC00LjA1MTI2OS0xMC44MTYzNDctNi4yNzY5Ni0xNy41Mzc0MjItNi43MjIwOTgtMTMuMDg3MDYzLTAuNDQ1MTM4LTI0Ljc1MTczIDUuNTIwNzM3LTM1LjEyMjkzOCAxNy44NTA1NTMtMTAuMzI3MjA2IDEyLjM3NDg0Mi0xNi45NjAyNzcgMjIuMzAwOTEyLTE5Ljg5NzE2NiAyOS42OTEyMy0yLjkzNzkxMiA3LjQzMzI5Ni00LjM2MzM3OCAxMi43MzA5NTItNC4zNjMzNzggMTUuODQ2OTE5LTAuNDQ1MTM4IDUuNDI5NjYzIDEuMTEzMzU3IDEyLjUwNzg3MiA0LjcxOTQ4OCAyMS4yNzY1ODNDNDc0LjMwNzUzOSAzNjUuNDUwMjczIDQ3OC42NzA5MTcgMzcxLjk5NTMzOSA0ODMuODM1NTQ0IDM3Ni4yMjQ2NjR6IiBmaWxsPSIjMTI5NmRiIiBwLWlkPSI0NzUyIj48L3BhdGg+PC9zdmc+`,
      },
      visible: false,
    };
  },
  mounted() {
    console.log("this==", this.duration);
    this.visible = true;
    this.startTimer();
  },
  methods: {
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          this.close();
        }, this.duration);
      }
    },
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
    close() {
      this.visible = false;
      this.clearTimer();
    },
    onClose() {},
  },
};
</script>

<style lang="less" scoped>
@media screen and (min-width: 751px) {
  .flex() {
    display: -moz-box;
    /* Firefox */
    display: -ms-flexbox;
    /* IE10 */
    display: -webkit-box;
    /* Safari */
    display: -webkit-flex;
    /* Chrome, WebKit */
    /* display: box; */
    display: flexbox;
    display: flex;
  }

  .notice-item {
    margin-top: 20px;
    background: #fff;
    border-radius: 5px;
    width: 380px;
    padding: 20px;
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
      0 9px 28px 8px #0000000d;
    .flex();
    .icon {
      content: "";
      min-width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    .content {
      .flex();
      flex-direction: column;
      margin-left: 5px;
      .title {
        font-size: 16px;
        color: rgba(0, 0, 0, 0.9);
        font-weight: 500;
      }
      .massage {
        margin-top: 5px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.62);
      }
    }
  }

  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes fadeOutRight {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }
  }

  .message-fade-enter-active {
    animation: fadeInRight 0.5s;
  }

  .message-fade-leave-active {
    animation: fadeOutRight 0.5s;
  }
}


@media screen and (max-width: 750px) {
  .flex() {
    display: -moz-box;
    /* Firefox */
    display: -ms-flexbox;
    /* IE10 */
    display: -webkit-box;
    /* Safari */
    display: -webkit-flex;
    /* Chrome, WebKit */
    /* display: box; */
    display: flexbox;
    display: flex;
  }

  .notice-item {
    margin-top: 10px;
    background: #fff;
    border-radius: 5px;
    width: 175px;
    padding: 10px;
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
      0 9px 28px 8px #0000000d;
    .flex();
    .icon {
      content: "";
      min-width: 20px;
      height: 20px;
      border-radius: 50%;
    }
    .content {
      .flex();
      flex-direction: column;
      margin-left: 5px;
      .title {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.9);
        font-weight: 500;
      }
      .massage {
        margin-top: 5px;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.62);
      }
    }
  }

  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes fadeOutRight {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }
  }

  .message-fade-enter-active {
    animation: fadeInRight 0.5s;
  }

  .message-fade-leave-active {
    animation: fadeOutRight 0.5s;
  }
}

</style>