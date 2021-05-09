window.addEventListener('DOMContentLoaded', function() {
    //判断是否处于登录状态
    if (localStorage.getItem("userId")) {
        index_beforelogin.style.display = 'none';
        index_login.style.display = 'block';
        lookuser(localStorage.getItem("userId"))
            .then(response => {
                var url_img = 'http://47.100.42.144:3389/' + response.data.data.avatar;
                var user_imgs = document.querySelectorAll('.user_img');
                for (var i = 0; i < user_imgs.length; i++) {
                    user_imgs[i].src = url_img;
                }
                var n = 1;
                var timeline_container = index_login.querySelector('.timeline_container');
                var login_index_entry_list = document.querySelector('.login_index_entry_list');
                getart_index(localStorage.getItem("userId"), 1, login_index_entry_list);
                window.addEventListener('scroll', function() {
                    if (Math.ceil(document.documentElement.clientHeight + document.documentElement.scrollTop - timeline_container.offsetTop) >= timeline_container.offsetHeight && index_login.style.display === 'block') {
                        n++;
                        getart_index(localStorage.getItem("userId"), n, login_index_entry_list);
                    }
                })
            });
    }
    //返回首页
    var main_nav_list_list = document.querySelectorAll('.main_nav_list_list');
    for (i = 2; i < main_nav_list_list.length; i++) {
        main_nav_list_list[i].children[0].addEventListener('click', function() {
            juejin_userweb.style.display = 'none';
            juejin_userweb_changeuserdetail.style.display = 'none';
            juejin_art_detail.style.display = 'none';
            index_login.style.display = 'block';
        })
    }
    //头部“写文章下拉”
    var more = document.querySelectorAll('.more');
    for (var i = 0; i < more.length; i++) {
        more[i].addEventListener('click', function() {
            for (var i = 0; i < more.length; i++) {
                if (more[i].nextElementSibling.style.display == 'block') {
                    more[i].nextElementSibling.style.display = 'none';
                } else {
                    more[i].nextElementSibling.style.display = 'block';
                }
            }
        })
    }
    //搜索框
    var search_form = document.querySelectorAll('.search_form');
    for (i = 0; i < search_form.length; i++) {
        search_form[i].children[0].addEventListener('focus', function() {
            this.setAttribute('placeholder', '文章/小册/标签/用户');
            for (var i = 0; i < search_form.length; i++) {
                search_form[i].classList.add('active');
                search_form[i].children[0].nextElementSibling.setAttribute('src', 'images/megaloscope _blue.svg');
            }
        })
    }
    for (i = 0; i < search_form.length; i++) {
        search_form[i].children[0].addEventListener('blur', function() {
            this.setAttribute('placeholder', '探索掘金');
            for (var i = 0; i < search_form.length; i++) {
                search_form[i].classList.remove('active');
                console.log(search_form[0].children[0]);
                search_form[i].children[0].nextElementSibling.setAttribute('src', 'images/megaloscope.svg');
            }
        })
    }
    //头部头像下拉
    var user_img = document.querySelectorAll('.user_img');
    for (i = 0; i < user_img.length; i++) {
        user_img[i].addEventListener('click', function() {
            if (this.nextElementSibling.style.display == 'block') {
                this.nextElementSibling.style.display = 'none';
            } else {
                this.nextElementSibling.style.display = 'block';
            }
        })
    }

    //登录
    var login_button = document.querySelector('.login_button');
    var close_btn = document.querySelector('.close_btn');
    var auth_modal_box = document.querySelector('.auth_modal_box');
    var number_input = document.querySelector('.number_input');
    var usernumber_box = document.querySelector('.usernumber_box');
    var clickable = document.querySelector('.clickable');
    var clickable_show1 = document.querySelector('.clickable_show1');
    var clickable_show2 = document.querySelector('.clickable_show2');
    var code_input = document.querySelector('.code_input');
    var oauth_box = document.querySelector('.oauth_box');
    var panfish = document.querySelector('.panfish');
    var btn_login = document.querySelector('.btn_login');
    var beforelogin_write_btn = document.querySelector('.beforelogin_write_btn');
    login_button.addEventListener('click', function() {
        auth_modal_box.style.display = 'flex';
        number_input.focus();
        clickable.style.display = 'inline-block';
        clickable_show1.style.display = 'none';
        clickable_show2.style.display = 'none';
        oauth_box.style.display = 'none';
    })
    beforelogin_write_btn.addEventListener('click', function() {
        auth_modal_box.style.display = 'flex';
        number_input.focus();
        clickable.style.display = 'inline-block';
        clickable_show1.style.display = 'none';
        clickable_show2.style.display = 'none';
        oauth_box.style.display = 'none';
    })
    close_btn.addEventListener('click', function() {
        if (auth_modal_box.style.display == 'flex') {
            auth_modal_box.style.display = 'none';
        } else {
            auth_modal_box.style.display = 'flex';
        }
    })
    number_input.addEventListener('focus', function() {
        usernumber_box.classList.add('focus');
        panfish.children[0].style.display = 'none';
        panfish.children[1].style.display = 'block';
    })
    number_input.addEventListener('blur', function() {
        usernumber_box.classList.remove('focus');
        panfish.children[1].style.display = 'none';
        panfish.children[0].style.display = 'block';
    })
    code_input.addEventListener('focus', function() {
        code_input.classList.add('focus');
        panfish.children[0].style.display = 'none';
        panfish.children[2].style.display = 'block';
    })
    code_input.addEventListener('blur', function() {
        code_input.classList.remove('focus');
        panfish.children[2].style.display = 'none';
        panfish.children[0].style.display = 'block';
    })
    clickable.addEventListener('click', function() {
        this.style.display = 'none';
        clickable_show1.style.display = 'inline-block';
        clickable_show2.style.display = 'inline-block';
        oauth_box.style.display = 'flex';
    })
    btn_login.addEventListener('click', function() {
            var userId_promise = login(number_input.value, code_input.value);
            userId_promise
                .then(userId => {
                    localStorage.setItem("userId", userId);
                    return islogin(userId);
                })
                .then(message => {
                    if (message === '已登录' || message === '该用户已登录') {
                        document.querySelector('#index_beforelogin').style.display = 'none';
                        document.querySelector('#index_login').style.display = 'block';
                        var userId = localStorage.getItem("userId");
                        var login_index_entry_list = document.querySelector('.login_index_entry_list');
                        var timeline_container = index_login.querySelector('.timeline_container');
                        //懒加载
                        var n = 1;
                        getart_index(userId, 1, login_index_entry_list);
                        window.addEventListener('scroll', function() {
                            if (Math.ceil(document.documentElement.clientHeight + document.documentElement.scrollTop - timeline_container.offsetTop) >= timeline_container.offsetHeight && index_login.style.display === 'none') {
                                n++;
                                getart_index(userId, n, login_index_entry_list);
                            }
                        })
                    }
                });
            userId_promise
                .then(userId => {
                    return lookuser(userId);
                })
                .then(response => {
                    var url_img = 'http://47.100.42.144:3389/' + response.data.data.avatar;
                    var user_imgs = document.querySelectorAll('.user_img');
                    for (var i = 0; i < user_imgs.length; i++) {
                        user_imgs[i].src = url_img;
                    }
                })
        })
        //退出登录
    var outlogin = document.querySelectorAll('.outlogin');
    for (i = 0; i < outlogin.length; i++) {
        outlogin[i].addEventListener('click', function() {
            var userId = localStorage.getItem("userId");
            outislogin(userId)
                .then(message => {
                    if (message === '退出登录成功') {
                        console.log(message);
                        document.querySelector('#index_beforelogin').style.display = 'block';
                        document.querySelector('#index_login').style.display = 'none';
                        juejin_userweb.style.display = 'none';
                        juejin_userweb_changeuserdetail.style.display = 'none';
                        auth_modal_box.style.display = 'none';
                    }
                });

        })
    }
    //登录请求
    function login(username, password) {
        return axios.post('http://47.100.42.144:3389/user/login', {
                username: username,
                password: password
            })
            .then(function(response) {
                // console.log(response);
                return response.data.data.userId;
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    function islogin(userId) {
        return axios.get('http://47.100.42.144:3389/user/islogin', {
                params: {
                    userId: userId
                }
            })
            .then(function(response) {
                // console.log(response);
                return response.data.data.message;
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    //获取用户信息
    function lookuser(userId) {
        return axios.get('http://47.100.42.144:3389/user/getUserInfo', {
                params: {
                    userId: userId
                }
            })
            .then(function(response) {
                return response;
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    //退出登录
    function outislogin(userId) {
        localStorage.clear();
        return axios.post('http://47.100.42.144:3389/user/logout', {
                userId: userId
            })
            .then(function(response) {
                return response.data.data.message;
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    //获取所有文章
    function getart_index(userId, j, father) {
        axios.get('http://47.100.42.144:3389/article/getArticle', {
                params: {
                    userId: userId,
                    page: j
                }
            })
            .then(function(response) {
                // console.log(response);
                for (var i = 0; i < response.data.data.length; i++) {
                    var artitem = father.children[1].cloneNode(true);
                    artitem.children[0].children[0].children[0].children[0].children[0].innerHTML = response.data.data[i].author;
                    artitem.children[0].children[0].children[1].children[0].innerHTML = response.data.data[i].title;
                    artitem.children[0].children[0].children[2].children[0].children[0].children[0].children[1].innerHTML = response.data.data[i].thumbUpNum;
                    artitem.children[0].children[0].children[2].children[0].children[1].children[0].children[1].innerHTML = response.data.data[i].commentNum;
                    if (response.data.data[i].isThumbUp) {
                        artitem.children[0].children[0].children[2].children[0].children[0].children[0].children[0].src = 'images/thumb_green.svg';
                    }
                    artitem.setAttribute('data-isthumbup', response.data.data[i].isThumbUp);
                    artitem.setAttribute('data-index', response.data.data[i].articleId);
                    artitem.setAttribute('data-page', j);
                    artitem.setAttribute('data-authorId', response.data.data[i].authorId)
                    father.appendChild(artitem);
                    artitem.style.display = 'block';
                }
                getintoartdetail();
                clicklike();
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    //进入文章详情
    var juejin_art_detail = document.querySelector('#juejin_art_detail');
    var item_comment = document.querySelector('.item_comment');
    var comment_box = document.querySelector('#comment_box');
    var post_comment = document.querySelector('#post_comment');
    var comment = document.querySelector('#comment');

    function getintoartdetail() {
        var login_index_entry_item = document.querySelectorAll('.login_index_entry_item');
        for (i = 0; i < login_index_entry_item.length; i++) {
            login_index_entry_item[i].addEventListener('click', function() {
                var articleId = this.getAttribute('data-index');
                var userId = localStorage.getItem("userId");
                var authorId = this.getAttribute('data-authorId');
                var follow_button = juejin_art_detail.querySelector('.follow_button');
                for (j = 1; j < comment_box.children[1].children.length; j++) {
                    comment_box.children[1].removeChild(comment_box.children[1].children[j]);
                    j--;
                }
                postartdetail(userId, articleId, authorId, index_login);
                clickdetail_like();
                ifSubscribe(follow_button);
                deleteArt();
                var n = 1;
                getComment(userId, articleId, 1, item_comment);
                window.addEventListener('scroll', function() {
                    if (Math.ceil(document.documentElement.clientHeight + document.documentElement.scrollTop - comment_box.offsetTop - 121) >= comment_box.offsetHeight && juejin_art_detail.style.display === 'block') {
                        n++;
                        getComment(userId, articleId, n, item_comment);
                    }
                });
            })
        }
    }
    //写评论
    post_comment.addEventListener('click', function() {
        var articleId = juejin_art_detail.querySelector('.article').getAttribute('data-index');
        var mycomment = comment.value;
        writecomment(localStorage.getItem("userId"), articleId, mycomment);
    });

    function postartdetail(userId, articleId, authorId, father) {
        axios.get('http://47.100.42.144:3389/article/getContent', {
                params: {
                    userId: userId,
                    articleId: articleId
                }
            })
            .then(function(response) {
                // console.log(response);
                var name = juejin_art_detail.querySelectorAll('.name');
                for (var i = 0; i < name.length; i++) {
                    name[i].innerHTML = response.data.data.author;
                }
                var avatar = juejin_art_detail.querySelectorAll('.avatar');
                for (i = 0; i < avatar.length; i++) {
                    avatar[i].src = 'http://47.100.42.144:3389/' + response.data.data.authorAvatar;
                }
                juejin_art_detail.querySelector('.article').setAttribute('data-index', articleId);
                juejin_art_detail.querySelector('.article').setAttribute('data-isthumbup', response.data.data.isThumbUp);
                juejin_art_detail.querySelector('.article').setAttribute('data-isDislike', response.data.data.isDislike);
                juejin_art_detail.querySelector('.article').setAttribute('data-authorId', authorId);
                juejin_art_detail.querySelector('.article_title').innerHTML = response.data.data.title;
                juejin_art_detail.querySelector('.article_content').innerHTML = response.data.data.content;
                juejin_art_detail.querySelector('.detail_like_btn').setAttribute('data-attr', response.data.data.thumbUpNum);
                juejin_art_detail.querySelector('.comment_btn').setAttribute('data-attr', response.data.data.commentNum);
                father.style.display = 'none';
                if (response.data.data.isThumbUp) {
                    juejin_art_detail.querySelector('.detail_like_btn').children[0].src = 'images/thumb_green.svg';
                } else {
                    juejin_art_detail.querySelector('.detail_like_btn').children[0].src = 'images/thumb-up.svg';
                }
                if (response.data.data.isDislike) {
                    juejin_art_detail.querySelector('.dislike_btn').children[0].src = 'images/thumb_green.svg';
                } else {
                    juejin_art_detail.querySelector('.dislike_btn').children[0].src = 'images/thumb-up.svg';
                }
                var follow_btn = juejin_art_detail.querySelectorAll('.follow_button');
                for (i = 0; i < follow_btn.length; i++) {
                    follow_btn[i].classList.remove('followed');
                    follow_btn[i].innerHTML = '关注';
                }
                juejin_art_detail.style.display = "block";
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    //进入写文章页面
    var login_write_btn = document.querySelectorAll('.login_write_btn');
    var juejin_web_editor = document.querySelector('#juejin_web_editor');
    var user_dropdown_list = document.querySelectorAll('.user_dropdown_list');
    for (i = 0; i < login_write_btn.length; i++) {
        login_write_btn[i].addEventListener('click', function() {
            juejin_web_editor.style.display = 'block';
            index_login.style.display = 'none';
            juejin_userweb.style.display = 'none';
            juejin_art_detail.style.display = 'none';
            juejin_userweb_changeuserdetail.style.display = 'none';
            getuserimg_write();
        })
    }
    for (i = 0; i < user_dropdown_list.length; i++) {
        user_dropdown_list[i].children[0].children[0].children[0].addEventListener('click', function() {
            juejin_web_editor.style.display = 'block';
            index_login.style.display = 'none';
            juejin_userweb.style.display = 'none';
            getuserimg_write();
        })
    }
    var edit_user_img = document.querySelector('.edit_user_img');
    var root_menu = document.querySelector('.root_menu');
    edit_user_img.addEventListener('click', function() {
        if (root_menu.style.display === 'block') {
            root_menu.style.display = 'none';
        } else {
            root_menu.style.display = 'block';
        }
    })

    function getuserimg_write() {
        //写文章页面获取头像
        var userId = localStorage.getItem("userId");
        lookuser(userId)
            .then(response => {
                var url_img = 'http://47.100.42.144:3389/' + response.data.data.avatar;
                document.querySelector('.edit_user_img').style.backgroundImage = 'url("' + url_img + '")';
            });
    }
    //写文章页面得到preview
    var bytemd_editor = document.querySelector('.bytemd_editor');
    var bytemd_preview = document.querySelector('.bytemd_preview');
    bytemd_editor.addEventListener('keyup', function() {
            bytemd_preview.children[0].children[0].innerHTML = bytemd_editor.children[0].value;
        })
        //写文章
    var xitu_btn = document.querySelector('.xitu_btn');
    var title_input = document.querySelector('.title_input');
    var editor_input = document.querySelector('#editor_input');
    xitu_btn.addEventListener('click', function() {
            var userId = localStorage.getItem("userId");
            if (title_input.value === '' || editor_input.value === '') {
                alert('您输入的内容为空！');
            } else {
                writeart(userId, title_input.value, editor_input.value);
                juejin_web_editor.style.display = 'none';
                index_login.style.display = 'block';
            }

        })
        //删除文章
    function deleteArt() {
        var deteleArt_btn = document.querySelector('.deteleArt_btn');
        deteleArt_btn.addEventListener('click', function() {
            axios.post('http://47.100.42.144:3389/article/deleteArticle', {
                    userId: localStorage.getItem("userId"),
                    articleId: this.parentNode.parentNode.children[0].children[0].getAttribute('data-index')
                })
                .then(response => {
                    console.log(response);
                    if (response.data.data.message === '删除失败') {
                        alert('您不能删除别人的文章！');
                    } else {
                        alert('已删除!');
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        })
    }

    function writeart(userId, title, content) {
        axios.post('http://47.100.42.144:3389/article/writeArticle', {
                userId: userId,
                title: title,
                content: content
            })
            .then(function(response) {
                // console.log(response.data.data.message);
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    //个人主页
    var myhomepage = document.querySelectorAll('#myhomepage');
    var juejin_userweb = document.querySelector('#juejin_userweb');
    var entry_list = document.querySelector('.entry_list');
    var empty = document.querySelector('.empty');
    var empty_box = document.querySelector('.empty_box');
    var top = document.querySelector('.top');
    var entry_item = document.querySelector('.entry_item');
    for (i = 0; i < myhomepage.length; i++) {
        myhomepage[i].addEventListener('click', function() {
            juejin_userweb.style.display = 'block';
            index_login.style.display = 'none';
            juejin_web_editor.style.display = 'none';
            juejin_art_detail.style.display = 'none';
            empty_box.style.display = 'flex';
            getuserimg_mainweb(localStorage.getItem("userId"));
            getusername(localStorage.getItem("userId"), top.children[0]);
            getlikeart()
                .then(response => {
                    var item_title = juejin_userweb.querySelectorAll('.item_title');
                    for (var i = 0; i < item_title.length; i++) {
                        if (item_title[i].innerHTML === '赞') {
                            item_title[i].nextElementSibling.innerHTML = response.data.data.length;
                        }
                    }
                });

        })
    }
    var header_content = document.querySelector('.header_content');
    var activity_list_box = document.querySelector('.activity_list_box');
    var concern_list_box = document.querySelector('.concern_list_box');
    var more_panel = document.querySelectorAll('.more_panel');
    var tag_list = document.querySelector('.tag_list');
    writeSubscribe();
    for (i = 0; i < header_content.children.length; i++) {
        header_content.children[i].addEventListener('click', function() {
            for (var i = 0; i < header_content.children.length; i++) {
                header_content.children[i].classList.remove('active');
                activity_list_box.style.display = 'none';
                concern_list_box.style.display = 'none';
                for (var j = 0; j < more_panel.length; j++) {
                    more_panel[j].style.display = 'none';
                }
            }
            this.classList.add('active');
            empty.style.display = 'block';
            empty_box.style.display = 'flex';
            entry_item.style.display = 'none';
            //文章
            if (this.children[0].innerHTML == '文章') {
                for (i = 2; i < entry_list.children.length; i++) {
                    entry_list.removeChild(entry_list.children[i]);
                    i--;
                }
                activity_list_box.style.display = 'block';
                createartli(entry_list)
                    .then(message => {
                        if (message === '该用户暂无文章') {
                            empty.style.display = 'block';
                            empty_box.style.display = 'flex';
                            entry_item.style.display = 'none';
                        } else {
                            empty.style.display = 'none';
                            empty_box.style.display = 'none';
                            clickdetail_like();
                            clicklike_userweb();
                        }
                    });
            }
            if (this.children[0].innerHTML == '赞') {
                more_panel[0].style.display = 'block';
                this.classList.remove('active');
                this.children[3].children[0].addEventListener('click', function(e) {
                    e.stopPropagation();
                    this.parentNode.style.display = 'none';
                    this.parentNode.parentNode.classList.add('active');
                    for (i = 2; i < entry_list.children.length; i++) {
                        entry_list.removeChild(entry_list.children[i]);
                        i--;
                    }
                    activity_list_box.style.display = 'block';
                    createartlike(entry_list)
                        .then(message => {
                            if (message === '暂无点赞文章') {
                                empty.style.display = 'block';
                                empty_box.style.display = 'flex';
                                entry_item.style.display = 'none';
                            } else {
                                empty.style.display = 'none';
                                empty_box.style.display = 'none';
                                clickdetail_like();
                                clicklike_userweb();
                            }
                        });
                })
            }
            if (this.children[0].innerHTML == '更多') {
                more_panel[1].style.display = 'block';
                this.classList.remove('active');
                this.children[2].children[1].addEventListener('click', function(e) {
                    e.stopPropagation();
                    this.parentNode.style.display = 'none';
                    this.parentNode.parentNode.classList.add('active');
                    concern_list_box.style.display = 'block';
                    empty_box.style.display = 'none';
                });
                concern_list_box.querySelectorAll('.sub_type')[0].addEventListener('click', function(e) {
                    e.stopPropagation();
                    for (i = 1; i < tag_list.children.length; i++) {
                        tag_list.removeChild(tag_list.children[i]);
                        i--;
                    }
                    writeSubscribe();
                })
                concern_list_box.querySelectorAll('.sub_type')[1].addEventListener('click', function(e) {
                    e.stopPropagation();
                    for (i = 1; i < tag_list.children.length; i++) {
                        tag_list.removeChild(tag_list.children[i]);
                        i--;
                    }
                    writeMySubscribe();
                })
            }
        })
    }
    //写入关注者
    function writeSubscribe() {
        getMySubscribe(localStorage.getItem("userId"))
            .then(response => {
                var userId = null;
                // console.log(response);
                if (response.data.data.message === '暂无关注用户') {
                    empty_box.style.display = 'flex';
                } else {
                    for (var i = 0; i < response.data.data.length; i++) {
                        userId = response.data.data[i].subId;
                        clonesub(userId);
                    }
                    empty_box.style.display = 'none';
                }

            });
    }
    //克隆关注者模块
    function clonesub(userId) {
        lookuser(userId)
            .then(response => {
                var cloneitem = tag_list.children[0].cloneNode(true);
                cloneitem.querySelector('.MySubscribe_img').src = 'http://47.100.42.144:3389/' + response.data.data.avatar;
                cloneitem.querySelector('.MySubscribe_name').innerHTML = response.data.data.nickname;
                cloneitem.querySelector('.detail').innerHTML = response.data.data.introduction;
                cloneitem.setAttribute('data-subId', userId);
                tag_list.appendChild(cloneitem);
                cloneitem.style.display = 'block';
            });
    }
    //写入我关注的人
    function writeMySubscribe() {
        getSubscribeMe(localStorage.getItem('userId'))
            .then(response => {
                var userId = null;
                if (response.data.data.message === '暂无关注用户') {
                    empty_box.style.display = 'flex';
                } else {
                    for (var i = 0; i < response.data.data.length; i++) {
                        userId = response.data.data[i].subId;
                        clonemysub(userId);
                    }
                    empty_box.style.display = 'none';
                }

            })
    }
    //克隆我关注的人模块
    function clonemysub(userId) {
        lookuser(userId)
            .then(response => {
                var cloneitem = tag_list.children[0].cloneNode(true);
                cloneitem.querySelector('.MySubscribe_img').src = 'http://47.100.42.144:3389/' + response.data.data.avatar;
                cloneitem.querySelector('.MySubscribe_name').innerHTML = response.data.data.nickname;
                cloneitem.querySelector('.detail').innerHTML = response.data.data.introduction;
                cloneitem.querySelector('.follow_button').classList.remove('followed');
                cloneitem.querySelector('.follow_button').innerHTML = '关注';
                cloneitem.setAttribute('data-subId', userId);
                tag_list.appendChild(cloneitem);
                cloneitem.style.display = 'block';
            })
    }
    //获取喜爱的文章
    function getlikeart() {
        return axios.get('http://47.100.42.144:3389/user/getUserLikeArticles', {
                params: {
                    userId: localStorage.getItem("userId")
                }
            })
            .then(function(response) {
                // console.log(response);
                return response;
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    //写入喜爱文章的信息
    function createartlike(father) {
        return getlikeart()
            .then(response => {
                if (response.data.data.message === '暂无点赞文章') {
                    return response.data.data.message;
                } else {
                    for (var i = 0; i < response.data.data.length; i++) {
                        var artitem = father.children[1].cloneNode(true);
                        artitem.children[0].children[0].children[0].children[0].children[0].innerHTML = response.data.data[i].author;
                        artitem.children[0].children[0].children[1].children[0].innerHTML = response.data.data[i].title;
                        artitem.children[0].children[0].children[2].children[0].children[0].children[0].children[1].innerHTML = response.data.data[i].thumbUpNum;
                        artitem.children[0].children[0].children[2].children[0].children[1].children[0].children[1].innerHTML = response.data.data[i].commentNum;
                        artitem.setAttribute('data-index', response.data.data[i].articleId);
                        father.appendChild(artitem);
                        artitem.style.display = 'block';
                    }
                    getintoartdetail_userweb();
                }

            })
    }
    //点击个人主页文章进入详情
    function getintoartdetail_userweb() {
        var entry_item = document.querySelectorAll('.entry_item');
        for (i = 0; i < entry_item.length; i++) {
            entry_item[i].addEventListener('click', function() {
                for (j = 1; j < comment_box.children[1].children.length; j++) {
                    comment_box.children[1].removeChild(comment_box.children[1].children[j]);
                    j--;
                }
                var articleId = this.getAttribute('data-index');
                var userId = localStorage.getItem("userId");
                postartdetail(userId, articleId, localStorage.getItem("userId"), juejin_userweb);
            })
        }
    }
    //点击个人主页的用户卡片进入它的用户主页
    // var juejin_other_userweb = document.querySelector('#juejin_other_userweb');
    // gointo_other_user();

    // function gointo_other_user() {
    //     var item_user = juejin_userweb.querySelectorAll('.item_user');
    //     for(var i=0;i<item_user.length;i++){
    //         item_user[i].addEventListener('click',function)
    //     }
    // }
    //返回主页
    var gobackuserweb = document.querySelector('#gobackuserweb');
    var juejin_userweb_changeuserdetail = document.querySelector('#juejin_userweb_changeuserdetail');
    gobackuserweb.addEventListener('click', function() {
        juejin_userweb_changeuserdetail.style.display = 'none';
        juejin_userweb.style.display = 'block';
    })

    function getuserimg_mainweb(userId) {
        //主页获取头像
        lookuser(userId)
            .then(response => {
                var url_img = 'http://47.100.42.144:3389/' + response.data.data.avatar;
                document.querySelector('.user_info_img').style.backgroundImage = 'url("' + url_img + '")';

            });
    }
    //主页获取用户名
    function getusername(userId, usernameh1) {
        axios.get('http://47.100.42.144:3389/user/getUserInfo', {
                params: {
                    userId: userId
                }
            })
            .then(function(response) {
                usernameh1.innerHTML = response.data.data.nickname;
                // console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    //写入自己文章的信息
    function createartli(father) {
        return getArticle()
            .then(response => {
                if (response.data.data.message === '该用户暂无文章') {
                    return response.data.data.message;
                } else {
                    for (var i = 0; i < response.data.data.length; i++) {
                        var artitem = father.children[1].cloneNode(true);
                        artitem.children[0].children[0].children[0].children[0].children[0].innerHTML = response.data.data[i].author;
                        artitem.children[0].children[0].children[1].children[0].innerHTML = response.data.data[i].title;
                        artitem.children[0].children[0].children[2].children[0].children[0].children[0].children[1].innerHTML = response.data.data[i].thumbUpNum;
                        artitem.children[0].children[0].children[2].children[0].children[1].children[0].children[1].innerHTML = response.data.data[i].commentNum;
                        if (response.data.data[i].isThumbUp) {
                            artitem.children[0].children[0].children[2].children[0].children[0].children[0].children[0].src = 'images/thumb_green.svg';
                        }
                        artitem.setAttribute('data-isthumbup', response.data.data[i].isThumbUp);
                        artitem.setAttribute('data-index', response.data.data[i].articleId);
                        // artitem.setAttribute('data-page', j);
                        father.appendChild(artitem);
                        artitem.style.display = 'block';
                    }
                    getintoartdetail_userweb();
                }

            })
    }
    // 获取自己的文章
    function getArticle() {
        return axios.get('http://47.100.42.144:3389/user/getUserWriteArticles', {
                params: {
                    userId: localStorage.getItem("userId"),
                }
            })
            .then(function(response) {
                // console.log(response);
                return response;
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    //进入个人信息修改页面
    var setting_btn = document.querySelector('.setting_btn');
    var username_change = document.querySelector('#username_change');
    var user_intro = document.querySelector('#user_intro');
    setting_btn.addEventListener('click', function() {
            juejin_userweb.style.display = 'none';
            juejin_userweb_changeuserdetail.style.display = 'block';
            getuserimg_changeuserdetail();
            putintousermess(username_change, user_intro)
        })
        //填入初始信息
    function putintousermess(username_change, user_intro) {
        var userId = localStorage.getItem("userId");
        lookuser(userId)
            .then(response => {
                username_change.children[0].placeholder = response.data.data.nickname;
                if (response.data.data.introduction !== '') {
                    user_intro.children[0].placeholder = response.data.data.introduction;
                }
            })
    }
    //修改头像
    var upload_btn = document.querySelector('.upload_btn');
    var avatar_uploader = document.querySelector('#avatar_uploader');
    upload_btn.addEventListener('click', function() {
        avatar_uploader.children[0].click();
    })
    avatar_uploader.children[0].addEventListener('change', function() {
            var toux = new FormData(avatar_uploader);
            toux.append("userId", localStorage.getItem("userId"));
            axios.post('http://47.100.42.144:3389/user/changeUserAvatar', toux)
                .then(function(response) {
                    // console.log(response);
                    changeuser_img_top();
                    getuserimg_changeuserdetail();
                })
                .catch(function(error) {
                    console.log(error);
                });
        })
        //获取头像
    function getuserimg_changeuserdetail() {
        //个人资料页面获取头像
        var userId = localStorage.getItem("userId");
        lookuser(userId)
            .then(response => {
                var url_img = 'http://47.100.42.144:3389/' + response.data.data.avatar;
                document.querySelector('.avatar').src = url_img;
            });
    }

    function changeuser_img_top() {
        lookuser(localStorage.getItem("userId"))
            .then(response => {
                var url_img = 'http://47.100.42.144:3389/' + response.data.data.avatar;
                var user_imgs = document.querySelectorAll('.user_img');
                for (var i = 0; i < user_imgs.length; i++) {
                    user_imgs[i].src = url_img;
                }
            })
    }
    //对用户名进行修改
    var btn = document.querySelector('.btn');
    btn.addEventListener('click', function() {
            var userId = localStorage.getItem("userId");
            axios.post('http://47.100.42.144:3389/user/changeUserInfo', {
                    userId: userId,
                    nickname: username_change.children[0].value
                })
                .then(function(response) {
                    // console.log(response);
                    alert('修改成功！');
                })
                .catch(function(error) {
                    console.log(error);
                });
        })
        //对个人介绍进行修改
    var edit_btn = document.querySelector('.edit_btn');
    edit_btn.addEventListener('click', function() {
            var userId = sessionStorage.getItem("userId");
            axios.post('http://47.100.42.144:3389/user/changeUserInfo', {
                    userId: userId,
                    introduction: user_intro.children[0].value
                })
                .then(function(response) {
                    // console.log(response);
                    alert('修改成功！');
                })
                .catch(function(error) {
                    console.log(error);
                });
        })
        //点赞操作
    function clickdetail_like() {
        var detail_like_btn = document.querySelector('.detail_like_btn');
        detail_like_btn.addEventListener('click', function() {
            detail_like(localStorage.getItem("userId"), this.parentNode.parentNode.children[0].children[0].getAttribute('data-index'),
                'true', this)
        })
    }


    function clicklike() {
        var like_btn = document.querySelectorAll('.like_btn');
        for (var i = 0; i < like_btn.length; i++) {
            like_btn[i].addEventListener('click', function(e) {
                if (this.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('data-isthumbup') === 'false') {
                    this.children[0].children[0].src = 'images/thumb_green.svg';
                } else {
                    this.children[0].children[0].src = 'images/thumb-up.svg';
                }
                e.stopPropagation();
                like(localStorage.getItem("userId"),
                    findfather(this, document.querySelectorAll('.login_index_entry_item')).getAttribute('data-index'),
                    "true",
                    this
                );
            })
        }
    }
    //主页点赞
    function clicklike_userweb() {
        var userweb_like_btn = document.querySelectorAll('.userweb_like_btn');
        for (var i = 0; i < userweb_like_btn.length; i++) {
            userweb_like_btn[i].addEventListener('click', function(e) {
                e.stopPropagation();
                like(localStorage.getItem("userId"),
                        findfather_userweb(this, document.querySelectorAll('.entry_item')).getAttribute('data-index'),
                        "true",
                        this
                    )
                    .then(response => {
                        if (response.data.data.message === '点赞成功') {
                            alert('点赞成功');
                        } else {
                            alert('取消点赞成功');
                        }
                    })
            })
        }
    }
    //查找子节点的父节点
    function findfather(son, allsamefather) {
        for (var i = 0; i < allsamefather.length; i++) {
            if (allsamefather[i].querySelector('.like_btn') === son) {
                return allsamefather[i];
            }
        }
    }

    function findfather_userweb(son, allsamefather) {
        for (var i = 0; i < allsamefather.length; i++) {
            if (allsamefather[i].querySelector('.userweb_like_btn') === son) {
                return allsamefather[i];
            }
        }
    }
    //点赞
    function like(userId, articleId, flag, numnode) {
        return axios.post('http://47.100.42.144:3389/article/thumbUpArticle', {
                userId: userId,
                articleId: articleId,
                flag: flag
            })
            .then(function(response) {
                // console.log(response);
                if (response.data.data.message === '点赞成功') {
                    numnode.children[0].children[1].innerHTML++;
                    numnode.parentNode.parentNode.parentNode.parentNode.parentNode.setAttribute('data-isthumbup', 'true');
                } else if (response.data.data.message === '点赞失败') {
                    flag = "false";
                    like(userId, articleId, flag, numnode);
                } else if (response.data.data.message === '取消点赞成功') {
                    numnode.children[0].children[1].innerHTML--;
                    numnode.parentNode.parentNode.parentNode.parentNode.parentNode.setAttribute('data-isthumbup', 'false');
                }
                return response;
            })
            .catch(function(error) {
                console.log(error);
            });

    }

    function detail_like(userId, articleId, flag, numnode) {
        axios.post('http://47.100.42.144:3389/article/thumbUpArticle', {
                userId: userId,
                articleId: articleId,
                flag: flag
            })
            .then(function(response) {
                // console.log(response);
                var login_index_entry_item = document.querySelectorAll('.login_index_entry_item');
                if (response.data.data.message === '点赞成功') {
                    numnode.setAttribute('data-attr', parseInt(numnode.getAttribute('data-attr')) + 1);
                    numnode.parentNode.parentNode.children[0].children[0].setAttribute('data-isthumbup', "true")
                    numnode.children[0].src = 'images/thumb_green.svg';
                    for (var i = 0; i < login_index_entry_item.length; i++) {
                        if (login_index_entry_item[i].getAttribute('data-index') === articleId) {
                            if (login_index_entry_item[i].getAttribute('data-isthumbup') === "false") {
                                login_index_entry_item[i].setAttribute('data-isthumbup', "true");
                                login_index_entry_item[i].children[0].children[0].children[2].children[0].children[0].children[0].children[1].innerHTML++;
                                login_index_entry_item[i].children[0].children[0].children[2].children[0].children[0].children[0].children[0].src = 'images/thumb_green.svg';
                            }
                        }
                    }
                } else if (response.data.data.message === '点赞失败') {
                    flag = "false";
                    detail_like(userId, articleId, flag, numnode);
                } else if (response.data.data.message === '取消点赞成功') {
                    numnode.setAttribute('data-attr', parseInt(numnode.getAttribute('data-attr')) - 1);
                    numnode.parentNode.parentNode.children[0].children[0].setAttribute('data-isthumbup', "false");
                    numnode.children[0].src = 'images/thumb-up.svg';
                    for (var i = 0; i < login_index_entry_item.length; i++) {
                        if (login_index_entry_item[i].getAttribute('data-index') === articleId) {
                            if (login_index_entry_item[i].getAttribute('data-isthumbup') === "true") {
                                login_index_entry_item[i].setAttribute('data-isthumbup', "false");
                                login_index_entry_item[i].children[0].children[0].children[2].children[0].children[0].children[0].children[1].innerHTML--;
                                login_index_entry_item[i].children[0].children[0].children[2].children[0].children[0].children[0].children[0].src = 'images/thumb-up.svg';
                            }
                        }
                    }
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    //点踩
    var dislike_btn = document.querySelector('.dislike_btn');
    dislike_btn.addEventListener('click', function() {
        var article = document.querySelector('.article');
        dislike(localStorage.getItem('userId'), article.getAttribute('data-index'), 'true', article, this)
    })

    function dislike(userId, articleId, flag, mess, node) {
        axios.post('http://47.100.42.144:3389/article/dislikeArticle', {
                userId: userId,
                articleId: articleId,
                flag: flag
            })
            .then(function(response) {
                // console.log(response);
                if (response.data.data.message === '点踩成功') {
                    mess.setAttribute('data-isdislike', 'true');
                    node.children[0].src = 'images/thumb_green.svg';
                } else if (response.data.data.message === '点踩失败') {
                    flag = "false";
                    dislike(userId, articleId, flag, mess, node);
                } else if (response.data.data.message === '取消点踩成功') {
                    mess.setAttribute('data-isdislike', 'false');
                    node.children[0].src = 'images/thumb-up.svg';
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    //关注
    subscribeoperation();

    function subscribeoperation() {
        var follow_button = document.querySelectorAll('.follow_button');
        for (i = 0; i < follow_button.length; i++) {
            follow_button[i].addEventListener('click', function() {
                console.log(2);
                subscribeSomeone(localStorage.getItem("userId"), document.querySelector('.article').getAttribute('data-authorid'))
                    .then(response => {
                        if (response.data.data.message === '关注成功') {
                            this.classList.add('followed');
                            this.innerHTML = '已关注';
                            this.parentNode.parentNode.nextElementSibling.nextElementSibling.children[0].children[2].classList.add('followed');
                            this.parentNode.parentNode.nextElementSibling.nextElementSibling.children[0].children[2].innerHTML = '已关注';
                        } else if (response.data.data.message === '已关注该用户') {
                            cancelSubscribe(localStorage.getItem("userId"), document.querySelector('.article').getAttribute('data-authorid'));
                            this.classList.remove('followed');
                            this.innerHTML = '关注';
                            this.parentNode.parentNode.nextElementSibling.nextElementSibling.children[0].children[2].classList.remove('followed');
                            this.parentNode.parentNode.nextElementSibling.nextElementSibling.children[0].children[2].innerHTML = '关注';
                        }
                    })
            })
        }
    }


    function subscribeSomeone(userId, subscribeId) {
        return axios.post('http://47.100.42.144:3389/user/subscribeSomeone', {
                userId: userId,
                subscribeId: subscribeId
            })
            .then(response => {
                console.log(response);
                return response
            })
            .catch(error => {
                console.log(error);
            })
    }

    function cancelSubscribe(userId, subscribeId) {
        return axios.post('http://47.100.42.144:3389/user/cancelSubscribe', {
                userId: userId,
                subscribeId: subscribeId
            })
            .then(response => {
                console.log(response);
                return response
            })
            .catch(error => {
                console.log(error);
            })
    }
    //判断是否有关注
    function ifSubscribe(node) {
        getMySubscribe(localStorage.getItem("userId"))
            .then(response => {
                for (var i = 0; i < response.data.data.length; i++) {
                    if (response.data.data[i].subId == node.parentNode.parentNode.getAttribute('data-authorid')) {
                        node.classList.add('followed');
                        node.innerHTML = '已关注';
                        node.parentNode.parentNode.nextElementSibling.nextElementSibling.children[0].children[2].classList.add('followed');
                        node.parentNode.parentNode.nextElementSibling.nextElementSibling.children[0].children[2].innerHTML = '已关注';
                    }
                }
            });
    }
    //获取用户关注的人
    function getMySubscribe(userId) {
        return axios.get('http://47.100.42.144:3389/user/getMySubscribe', {
                params: {
                    userId: userId
                }
            })
            .then(response => {
                // console.log(response);
                return response;
            })
            .catch(error => {
                console.log(error);
            })
    }
    //获取关注者
    function getSubscribeMe(userId) {
        return axios.get('http://47.100.42.144:3389/user/getSubscribeMe', {
                params: {
                    userId: userId
                }
            })
            .then(response => {
                // console.log(response);
                return response;
            })
            .catch(error => {
                console.log(error);
            })
    }
    //获取评论
    function getComment(userId, articleId, page, father) {
        axios.get('http://47.100.42.144:3389/comment/getComment', {
                params: {
                    userId: userId,
                    articleId: articleId,
                    page: page
                }
            })
            .then(function(response) {
                // console.log(response);
                for (var i = 0; i < response.data.data.length; i++) {
                    var clonecomment = father.cloneNode(true);
                    clonecomment.children[0].children[1].children[1].innerHTML = response.data.data[i].comment;
                    clonecomment.setAttribute('data-commentId', response.data.data[i].commentId);
                    clonecomment.children[0].children[1].children[0].innerHTML = response.data.data[i].commentator;
                    clonecomment.children[0].children[0].src = 'http://47.100.42.144:3389/' + response.data.data[i].commentatorAvatar;
                    clonecomment.setAttribute('data-isDislike', response.data.data[i].isDislike);
                    clonecomment.setAttribute('data-isThumbUp', response.data.data[i].isThumbUp);
                    if (response.data.data[i].isThumbUp) {
                        clonecomment.querySelector('.like_action').children[0].src = 'images/thumb_green.svg';
                    }
                    clonecomment.setAttribute('data-replyNum', response.data.data[i].replyNum);
                    clonecomment.setAttribute('data-thumbUpNum', response.data.data[i].thumbUpNum);
                    getReply(userId, response.data.data[i].commentId, 1, clonecomment)
                    father.parentNode.appendChild(clonecomment);
                    clonecomment.style.display = 'block';
                }
                deleteComment(userId);
                thumbUpComment(userId, 'true');
                dislikeComment(userId, 'true');
                clickreplybtn();
                setTimeout(function() {
                    replyout();
                }, 2000);
                setTimeout(function() {
                    deletereply(userId);
                }, 2000);
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    //写评论
    function writecomment(userId, articleId, comment) {
        axios.post('http://47.100.42.144:3389/comment/postComment', {
                userId: userId,
                articleId: articleId,
                comment: comment
            })
            .then(response => {
                alert('评论成功！')
                    // console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }
    //删除评论
    function deleteComment(userId) {
        var delete_action = document.querySelectorAll('.delete_action');
        for (var i = 0; i < delete_action.length; i++) {
            delete_action[i].addEventListener('click', function() {
                axios.post('http://47.100.42.144:3389/comment/deleteComment', {
                        userId: userId,
                        commentId: this.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('data-commentid'),
                    })
                    .then(response => {
                        // console.log(response);
                        if (response.data.data.message === '删除失败') {
                            alert('您不能删除别人的评论！');
                        } else {
                            this.parentNode.parentNode.parentNode.parentNode.parentNode.remove();
                        }

                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
        }
    }
    //点赞评论
    function thumbUpComment(userId, flag) {
        var like_action = document.querySelectorAll('.like_action');
        for (var i = 0; i < like_action.length; i++) {
            like_action[i].addEventListener('click', function() {
                tucpost(userId, this, flag);
            })
        }
    }
    //点赞评论请求
    function tucpost(userId, node, flag) {
        axios.post('http://47.100.42.144:3389/comment/thumbUpComment', {
                userId: userId,
                commentId: node.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('data-commentid'),
                flag: flag
            })
            .then(function(response) {
                // console.log(response);
                if (response.data.data.message == '点赞成功') {
                    node.children[0].src = 'images/thumb_green.svg'
                } else if (response.data.data.message == '点赞失败') {
                    tucpost(userId, node, "false")
                } else if (response.data.data.message == '取消点赞成功') {
                    node.children[0].src = 'images/thumb-up.svg';
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    //点踩评论
    function dislikeComment(userId, flag) {
        var dislike_action = document.querySelectorAll('.dislike_action');
        for (var i = 0; i < dislike_action.length; i++) {
            dislike_action[i].addEventListener('click', function() {
                dlcpost(userId, this, flag);
            })
        }
    }

    function dlcpost(userId, node, flag) {
        axios.post('http://47.100.42.144:3389/comment/dislikeComment', {
                userId: userId,
                commentId: node.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('data-commentid'),
                flag: flag
            })
            .then(function(response) {
                // console.log(response);
                if (response.data.data.message == '点踩成功') {
                    node.children[0].src = 'images/thumb_green.svg'
                } else if (response.data.data.message == '点踩失败') {
                    dlcpost(userId, node, "false")
                } else if (response.data.data.message == '取消点踩成功') {
                    node.children[0].src = 'images/thumb-up.svg';
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    //获取回复
    function getReply(userId, commentId, page, father) {
        return axios.get('http://47.100.42.144:3389/reply/getReply', {
                params: {
                    userId: userId,
                    commentId: commentId,
                    page: page
                }
            })
            .then(response => {
                // console.log(response);
                // return response;
                if (response.data.data.length == 5) {
                    clonereply(father, response)
                    page++;
                    getReply(userId, commentId, page, father);
                } else if (0 < response.data.data.length < 5) {
                    clonereply(father, response);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    //克隆回复节点
    function clonereply(father, response) {
        var comment_reply_item = father.querySelector('.comment_reply_item');
        for (var i = 0; i < response.data.data.length; i++) {
            var clonecommentreply = comment_reply_item.cloneNode(true);
            clonecommentreply.querySelector('.reply_avatar').src = 'http://47.100.42.144:3389/' + response.data.data[i].replierAvatar;
            clonecommentreply.querySelector('.profie').innerHTML = response.data.data[i].replier;
            clonecommentreply.querySelector('.reply_content_box').innerHTML = response.data.data[i].replyContent;
            clonecommentreply.setAttribute('data-replyId', response.data.data[i].replyId);
            father.querySelector('.sub_comment_list').appendChild(clonecommentreply);
            clonecommentreply.style.display = 'block';
        }
    }
    //点击回复弹出
    function replyout() {
        var comment_action = document.querySelectorAll('.comment_action');
        for (var i = 0; i < comment_action.length; i++) {
            comment_action[i].addEventListener('click', function() {
                if (this.parentNode.parentNode.nextElementSibling.style.display == 'flex') {
                    this.parentNode.parentNode.nextElementSibling.style.display = 'none';
                } else {
                    this.parentNode.parentNode.nextElementSibling.style.display = 'flex';
                }
            })
        }
    }
    //提交回复
    function clickreplybtn() {
        var postreply_btn = document.querySelectorAll('#postreply_btn');
        var userId = localStorage.getItem('userId');
        for (var i = 0; i < postreply_btn.length; i++) {
            postreply_btn[i].addEventListener('click', function() {
                postReply(userId, this.parentNode.parentNode.parentNode.parentNode.getAttribute('data-commentid'), this.previousElementSibling.value)

            })
        }
    }

    function postReply(userId, commentId, reply) {
        axios.post('http://47.100.42.144:3389/reply/postReply', {
                userId: userId,
                commentId: commentId,
                reply: reply
            })
            .then(response => {
                // console.log(response);
                alert('发送成功');
            })
            .catch(error => {
                console.log(error);
            })
    }
    //删除请求
    function deletereplypost(userId, replyId) {
        axios.post('http://47.100.42.144:3389/reply/deleteReply', {
                userId: userId,
                replyId: replyId
            })
            .then(response => {
                console.log(response);
                if (response.data.data.message === '删除失败') {
                    alert('你不能删除别人的回复！');
                } else {
                    alert('删除成功！！');
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    //删除回复
    function deletereply(userId) {
        var deletereply_action = document.querySelectorAll('.deletereply_action');
        for (var i = 0; i < deletereply_action.length; i++) {
            deletereply_action[i].addEventListener('click', function(e) {
                e.stopPropagation();
                var replyId = this.parentNode.parentNode.parentNode.parentNode.getAttribute('data-replyid');
                deletereplypost(userId, replyId);
            })
        }
    }
})