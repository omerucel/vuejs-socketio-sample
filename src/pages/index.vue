<template lang="html">
    <div class="chat-box">
        <div v-if="joined == false">
            <div class="join-form">
                <div class="form-group">
                    <input type="text" v-model="nickname" placeholder="Nickname" class="form-control" v-on:keyup.13="join" />
                </div>
                <button type="button" class="btn btn-primary" v-on:click="join">Join</button>
            </div>
        </div>
        <div v-if="joined">
            <div class="messages"><div class="list-group"></div></div>
            <div class="message-input">
                <input type="text" v-model="message" placeholder="Message" class="form-control" v-on:keyup.13="send" />
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'

export default {
    data () {
        return {
            joined: false,
            nickname: '',
            message: ''
        }
    },
    sockets: {
        disconnect () {
            this.joined = false
        },
        joined () {
            this.joined = true;
        },
        message (data) {
            this.appendMessage(data);
        }
    },
    methods: {
        join () {
            this.$socket.emit('join', {nickname:this.nickname})
        },
        send () {
            this.appendMessage({nickname: this.nickname, message: this.message});
            this.$socket.emit('message', {nickname: this.nickname, message:this.message})
            this.message = ''
        },
        appendMessage (data) {
            $('.messages').append('<div class="list-group-item">' + data.nickname + ' => ' + data.message + '</div>')
            window.scrollTo(0, $('.messages').height());
        }
    }
}
</script>

<style lang="css">

    .join-form{
        position: fixed;
        top: 10px;
        left: 10px;
        right: 10px;
    }

    .messages {
        overflow-y: auto;
        margin: 10px;
        padding-bottom: 50px;
    }

    .message-input {
        position: fixed;
        left: 10px;
        right: 10px;
        bottom: 10px;
    }
</style>
