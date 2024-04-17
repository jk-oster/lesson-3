'use strict';

// Open AI Documentation: https://platform.openai.com/docs/api-reference/chat/object

// OPENAI API TAGESMENÜ:
// https://api.openai.com/v1/chat/completions - POST
// Fetch request options example:
// {
// method: "POST",
// headers: {
//     "Content-Type": "application/json",
//     "Authorization": "Bearer ApiKeyGoesHere"
// },
// body: '{
//     "model": "gpt-3.5-turbo",
//     "messages": [{
//          "role":"user",
//          "content":"The message goes HeroTeaserComponent..."
//      }]
// }'
// }

// RESPONSE Example:
// {
//     "id": "chatcmpl-8sH70IAhiID98Th5qEWN64K4GiVzJ",
//     "object": "chat.completion",
//     "created": 1707946182,
//     "model": "gpt-3.5-turbo-0613",
//     "choices": [
//     {
//         "index": 0,
//         "message": {
//             "role": "assistant",
//             "content": "Hello! How can I assist you today?"
//         },
//         "logprobs": null,
//         "finish_reason": "stop"
//     }
// ],
//     "usage": {
//     "prompt_tokens": 8,
//         "completion_tokens": 9,
//         "total_tokens": 17
// },
//     "system_fingerprint": null
// }
