<template>
    <div class="login fullscreen row h100">

        <div class="col col-4 push-center push-middle">
            <form class="form" @submit.prevent="login">
                <h1 class="form__title">Gestion Assoc</h1>

                <div class="message error" v-if="error"> {{ error }}<span class="close small" @click="error = false"></span></div>

                <div class="form-item">
                    <label>Identifiant</label>
                    <input type="text" class="form__control" v-model="form.username">
                </div>
                <div class="form-item">
                    <label>Mot de passe</label>
                    <input type="password" class="form__control" v-model="form.password">
                </div>
                <div class="form-item">
                    <button :disabled="isProcessing" class="btn btn__primary">Se connecter</button>
                </div>
            </form>

        </div>

    </div>

</template>
<script type="text/javascript">
    import Auth from '../../store/auth'
    import { post } from '../../helpers/api'
    export default {
        data() {
            return {
                form: {
                    username: '',
                    password: ''
                },
                error: false,
                isProcessing: false
            }
        },
        methods: {
            login() {
                this.isProcessing = true
                this.error = false
                let now = Date.now();
                post('api/login', this.form)
                    .then((res) => {
                        if(res.data.access_token) {
                            // set token
                            res.data.expiration = now + res.data.expires_in*1000;
                            Auth.set(res.data)
                            this.$router.push('/')
                        }
                        this.isProcessing = false
                    })
                    .catch((err) => {
                        if(err.response.status === 400 || err.response.status === 401) {
                            console.log(err.response);
                            this.error = err.response.data.message
                        }
                        this.isProcessing = false
                    })
            }
        }
    }
</script>
