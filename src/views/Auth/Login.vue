<template>
    <div class="container">
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <form @submit.prevent="loginSubmit">
                    <label for="email">Email</label>
                    <input type="text" name="email" id="email" v-model="loginData.email_or_phone" /><hr>
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" v-model="loginData.password" /><hr>
                    <button class="btn btn-sm btn-primary" type="submit">Login</button>
                </form>
            </div>
        </div>
        <!-- Login page -->
         <h2>Login page</h2>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter  } from 'vue-router';

const store = useStore();
const router = useRouter()

const loginData = ref({
        email_or_phone: '',
        password: ''
    })

const loginSubmit = () => {
    store.dispatch('auth/login', loginData.value)
       .then((response) => {
            router.replace({name: 'home'})
        })
       .catch((error) => console.log(error))
}
</script>

<!-- <script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            loginData: {
                email_or_phone: '',
                password: ''
            }
        }
    },
    methods: {
        ...mapActions('auth', ['login']),
        async loginSubmit() {
            await this.login(this.loginData)
                .then((response) => {
                    this.$router.push({name: 'home'})
                })
                .catch((error) => console.log(error))
        }
    },
}
</script> -->
