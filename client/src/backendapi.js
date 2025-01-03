// users
export const REGISTER_USER = "http://localhost:8081/api/v1/u/register";
export const LOGIN_USER = "http://localhost:8081/api/v1/u/login";
export const LOGOUT_USER = "http://localhost:8081/api/v1/u/logout";
export const USER_INTERESTS = "http://localhost:8081/api/v1/u/interest"; // this url contains query parameters
export const MY_DETAILS = "http://localhost:8081/api/v1/u/my";
export const CHECK_IS_LIKED = "http://localhost:8081/api/v1/u/check_is_liked";
export const GET_MY_MATCHES = "http://localhost:8081/api/v1/u/my_match";

// search
export const USERS_SEARCH = "http://localhost:8081/api/v1/search/users?q=";

//chat
export const NEW_MESSAGE = "http://localhost:8081/api/v1/chat/new";
export const ALL_CHATS = "http://localhost:8081/api/v1/chat/all";

// random person
export const GENERATE_RANDOM_PERSON = "http://localhost:8081/api/v1/random/r";

// url for online status check.

export const CHECK_ONLINE_STATUS = "ws://localhost:8083/";
