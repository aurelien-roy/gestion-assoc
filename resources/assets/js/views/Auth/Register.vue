<template>
    <div class="login fullscreen row h100">
        <div class="col col-4 push-center push-middle">
            <form class="form" @submit.prevent="register">
                <h1>Inscription</h1>
                <p>Inscrivez votre organisation dès maintenant et commencez à gérer plus efficacement vos activités, vos membres et votre comptabilité !</p>

                <div class="message error" v-if="error"> {{ error }}<span class="close small" @click="error = false"></span></div>

                <div class="form-item">
                    <label>Nom de l'organisation</label>
                    <input type="text" class="form__control" v-model="form.organization_name">
                </div>
                <div class="row gutters">
                    <div class="col col-6 form-item">
                        <label>Nom</label>
                        <input type="text" class="form__control" v-model="form.first_name">
                    </div>
                    <div class="col col-6 form-item">
                        <label>Prénom</label>
                        <input type="text" class="form__control" v-model="form.last_name">
                    </div>
                </div>
                <div class="form-item">
                    <label>E-mail Pro</label>
                    <input type="text" class="form__control" v-model="form.email">
                </div>
                <div class="form-item">
                    <label>Mot de passe</label>
                    <input type="password" class="form__control" v-model="form.password">
                </div>
                <div class="form-item">
                    <button :disabled="isProcessing" class="btn btn__primary">Inscription</button>
                    <p><a href="/login">Je suis déjà inscrit</a></p>
                </div>
            </form>
        </div>
    </div>
</template>
<script type="text/javascript">
    import Flash from '../../helpers/flash'
    import { post } from '../../helpers/api'
    export default {
        data() {
            return {
                form: {
                    organization_name: '',
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                },
                error: false,
                isProcessing: false
            }
        },
        methods: {
            register() {
                this.isProcessing = true;
                this.error = false;
                post('api/organization', this.form)
                    .then((res) => {
                        this.$router.push('/login')
                        this.isProcessing = false
                    })
                    .catch((err) => {
                        if(err.response.status === 422) {
                            this.error = err.response.data
                        }
                        this.isProcessing = false
                    })
            }
        }
    }
</script>
