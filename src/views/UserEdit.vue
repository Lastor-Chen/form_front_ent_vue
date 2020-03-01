<template>
  <div class="container py-5">
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text"
          id="name"
          v-model="user.name"
          name="name"
          class="form-control"
          placeholder="Enter name"
          required
        >
      </div>

      <div class="form-group">
        <label for="image">Image</label>
        <img
          v-if="user.image"
          :src="user.image"
          class="d-block img-thumbnail mb-3"
          width="200" height="200"
        >
        <input type="file"
          id="image"
          name="image"
          class="form-control-file"
          accept="image/*"
          @change="handleFileChange"
        >
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
const dummyUser = {
  "profile": {
    "id": 1,
    "name": "root",
    "email": "root@example.com",
    "password": "$2a$10$J9pLpJJ1Tzfe/ZcjdYwXdumyh.3F5E.w/HTxRcH./cl3azhgekgQe",
    "isAdmin": true,
    "image": 'http://i.pravatar.cc/300',
    "createdAt": "2020-02-28T14:38:32.000Z",
    "updatedAt": "2020-02-28T14:38:32.000Z",
    "Comments": [
        {
            "id": 3,
            "text": "Qui maiores repellendus facere animi sit omnis asperiores pariatur.",
            "UserId": 1,
            "RestaurantId": 3,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 3,
                "name": "Herminio Nicolas",
                "tel": "063-480-5811 x2308",
                "address": "52267 Marquardt Corners",
                "opening_hours": "08:00",
                "description": "autem",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=38.32006179376239",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 1
            }
        },
        {
            "id": 4,
            "text": "In aut natus qui tempora consequatur.",
            "UserId": 1,
            "RestaurantId": 4,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 4,
                "name": "Adalberto Anderson",
                "tel": "313.718.9513 x0422",
                "address": "3047 Marge Key",
                "opening_hours": "08:00",
                "description": "Quo asperiores qui omnis maxime qui voluptates sit vel. Aut dolor iste ut voluptatum dolorum. Veritatis placeat expedita quo debitis quae voluptatem et harum. Ipsam minima alias in. Fugiat quos et et ut aut vel ab facilis officiis.\n \rQuaerat molestiae placeat fuga et vero neque perferendis qui et. Neque ut a hic dignissimos ea voluptas. Dignissimos distinctio perspiciatis minima.\n \rRecusandae ut et. Aut ipsum officia voluptatem soluta maiores atque quia. Veniam temporibus occaecati sunt consequuntur tempora dolore. Accusamus qui eum. Possimus dolore et sequi expedita praesentium sed dolore.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=61.21382535340547",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 4
            }
        },
        {
            "id": 6,
            "text": "Excepturi perspiciatis cupiditate quae.",
            "UserId": 1,
            "RestaurantId": 6,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 6,
                "name": "Vicenta Gutkowski",
                "tel": "128-905-3953",
                "address": "371 Reuben Vista",
                "opening_hours": "08:00",
                "description": "labore",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=16.659471621888123",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 3
            }
        },
        {
            "id": 9,
            "text": "In perspiciatis blanditiis deleniti eum omnis ipsa.",
            "UserId": 1,
            "RestaurantId": 9,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 9,
                "name": "Luz Schaden",
                "tel": "1-712-742-4184",
                "address": "4929 Wisozk Centers",
                "opening_hours": "08:00",
                "description": "Culpa deserunt molestiae eligendi est ex incidunt.\nNisi sit totam.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=6.497835218728576",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 5
            }
        },
        {
            "id": 13,
            "text": "Qui nisi temporibus aut facere unde.",
            "UserId": 1,
            "RestaurantId": 13,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 13,
                "name": "Mrs. Eileen Lockman",
                "tel": "(597) 404-9974 x003",
                "address": "383 Stroman Center",
                "opening_hours": "08:00",
                "description": "Vitae id incidunt animi qui sapiente perferendis iusto. Nemo placeat ut voluptas quae cupiditate eligendi. Expedita laborum vitae nulla quia ipsam. Et sunt a veniam culpa asperiores qui culpa. Odit reiciendis dolore reprehenderit est est voluptas ut rerum.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=54.950245749491145",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 2
            }
        },
        {
            "id": 17,
            "text": "Molestiae velit dolore qui.",
            "UserId": 1,
            "RestaurantId": 17,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 17,
                "name": "Garnet Becker",
                "tel": "763.540.2225",
                "address": "698 Daphnee Crossing",
                "opening_hours": "08:00",
                "description": "Fugit vero sapiente facilis neque quaerat possimus voluptatum ab. Doloremque omnis dolor commodi et. Et voluptatem ut voluptatem perferendis aut tempora quia. Aut in eum sit.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=8.238232307545857",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 4
            }
        },
        {
            "id": 20,
            "text": "Est quibusdam voluptatem ipsum recusandae et necessitatibus suscipit.",
            "UserId": 1,
            "RestaurantId": 20,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 20,
                "name": "Ms. Stephanie Smith",
                "tel": "1-574-132-5696 x54763",
                "address": "1610 Piper View",
                "opening_hours": "08:00",
                "description": "Fugit inventore placeat ullam rerum quo ut. Dolorem ipsam tempore quisquam porro aspernatur dicta beatae. Magni aut in. Fugiat sit qui aut.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=38.787623335517175",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 4
            }
        },
        {
            "id": 24,
            "text": "Atque eaque architecto dolorem cupiditate adipisci veniam vel iusto hic.",
            "UserId": 1,
            "RestaurantId": 24,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 24,
                "name": "Jonathon Medhurst",
                "tel": "078-927-0426",
                "address": "081 Raheem Creek",
                "opening_hours": "08:00",
                "description": "Blanditiis sed aut mollitia nihil est saepe. Est repellendus vel iusto ex tempore. Cupiditate voluptas optio. Illo soluta qui.\n \rReprehenderit in sunt hic in culpa et. Et ab sequi id. Quia et itaque est distinctio ut ex doloremque dolor.\n \rDolorem eligendi animi dolor. Numquam corporis voluptatum. Et odit fugiat est.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=73.44969729408322",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 4
            }
        },
        {
            "id": 25,
            "text": "Est qui culpa itaque distinctio.",
            "UserId": 1,
            "RestaurantId": 25,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 25,
                "name": "Adolf Cremin",
                "tel": "615-211-0544 x15613",
                "address": "602 Wilhelmine Lodge",
                "opening_hours": "08:00",
                "description": "Error omnis blanditiis.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=1.6110317847147781",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 4
            }
        },
        {
            "id": 34,
            "text": "Veniam et ut occaecati expedita vel minus in.",
            "UserId": 1,
            "RestaurantId": 34,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 34,
                "name": "Joy Bernhard",
                "tel": "033-240-2167 x43925",
                "address": "6384 Norbert Pike",
                "opening_hours": "08:00",
                "description": "Alias ut repellat et omnis quaerat cum.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=5.417775534122438",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 3
            }
        },
        {
            "id": 37,
            "text": "Vero eos est ipsam eos.",
            "UserId": 1,
            "RestaurantId": 37,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 37,
                "name": "Ms. Nona Bergstrom",
                "tel": "714.113.2795 x3906",
                "address": "38244 Julian Locks",
                "opening_hours": "08:00",
                "description": "beatae sed consectetur",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=22.026378082051433",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 1
            }
        },
        {
            "id": 38,
            "text": "Qui nam temporibus dolore aspernatur soluta omnis.",
            "UserId": 1,
            "RestaurantId": 38,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 38,
                "name": "Will Simonis",
                "tel": "607.753.9619 x395",
                "address": "18639 Wilton Courts",
                "opening_hours": "08:00",
                "description": "laborum voluptas accusantium",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=75.4278047434088",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 5
            }
        },
        {
            "id": 39,
            "text": "Voluptatem architecto tempore hic incidunt.",
            "UserId": 1,
            "RestaurantId": 39,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 39,
                "name": "Christy Bauch",
                "tel": "1-370-634-6490 x59473",
                "address": "756 Dicki Ports",
                "opening_hours": "08:00",
                "description": "Earum aut delectus et voluptatibus ipsam deserunt ex.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=5.459083807432652",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 2
            }
        },
        {
            "id": 41,
            "text": "Laborum nobis pariatur repellendus et maiores quod dolores harum quisquam.",
            "UserId": 1,
            "RestaurantId": 41,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 41,
                "name": "Bulah Cummerata",
                "tel": "1-272-941-4227 x5104",
                "address": "468 Lemke Isle",
                "opening_hours": "08:00",
                "description": "Autem dolorem qui dignissimos corporis alias neque veniam est. Ducimus saepe illo iste. Enim nisi rerum. Praesentium eveniet temporibus qui voluptate et est.\n \rAccusamus et et at cum nemo. Et voluptatibus excepturi non quo. Amet at quod. Hic sunt velit dolor.\n \rQuasi hic consequatur dolor. Sint laboriosam ullam ipsa atque. Cumque odit assumenda harum occaecati. Voluptatem voluptates fuga.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=77.15667863642383",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 5
            }
        },
        {
            "id": 45,
            "text": "Veniam sunt quia dignissimos voluptatum.",
            "UserId": 1,
            "RestaurantId": 45,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 45,
                "name": "Anjali Kassulke",
                "tel": "313-500-9523 x7668",
                "address": "356 Reanna Fall",
                "opening_hours": "08:00",
                "description": "dolore",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=37.65242985288428",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 1
            }
        },
        {
            "id": 57,
            "text": "Temporibus aut id consequatur minima voluptas debitis odit.",
            "UserId": 1,
            "RestaurantId": 7,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 7,
                "name": "Miss Letitia Will",
                "tel": "(770) 750-6811 x99988",
                "address": "8145 Laisha Keys",
                "opening_hours": "08:00",
                "description": "Aut earum molestiae et ducimus adipisci ut maxime.\nVeritatis labore illum et similique cumque qui qui officia omnis.\nQui laudantium amet enim natus.\nVoluptatem quia est nam ut esse et.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=44.558618229229",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 5
            }
        },
        {
            "id": 62,
            "text": "Ullam aut quisquam non nisi omnis.",
            "UserId": 1,
            "RestaurantId": 12,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 12,
                "name": "Oliver Padberg",
                "tel": "865-523-0270 x58016",
                "address": "771 Oberbrunner Hollow",
                "opening_hours": "08:00",
                "description": "Magni qui facilis asperiores. Voluptatem cumque corrupti ea at voluptatem. Assumenda esse esse fuga autem dolor qui. Veniam qui eius vero magnam ut inventore magni est.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=22.348939427568215",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 1
            }
        },
        {
            "id": 65,
            "text": "Dolore nemo nihil explicabo magni.",
            "UserId": 1,
            "RestaurantId": 15,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 15,
                "name": "Richmond Corkery",
                "tel": "698.382.3761",
                "address": "23899 Rosenbaum Causeway",
                "opening_hours": "08:00",
                "description": "esse blanditiis libero",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=84.02951589176762",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 1
            }
        },
        {
            "id": 67,
            "text": "Dolores quas vero itaque autem asperiores temporibus animi tenetur.",
            "UserId": 1,
            "RestaurantId": 17,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 17,
                "name": "Garnet Becker",
                "tel": "763.540.2225",
                "address": "698 Daphnee Crossing",
                "opening_hours": "08:00",
                "description": "Fugit vero sapiente facilis neque quaerat possimus voluptatum ab. Doloremque omnis dolor commodi et. Et voluptatem ut voluptatem perferendis aut tempora quia. Aut in eum sit.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=8.238232307545857",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 4
            }
        },
        {
            "id": 72,
            "text": "Asperiores vel soluta rerum.",
            "UserId": 1,
            "RestaurantId": 22,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 22,
                "name": "Franco Mraz IV",
                "tel": "322.919.2004 x425",
                "address": "700 Swift Plains",
                "opening_hours": "08:00",
                "description": "Nisi qui enim vitae maiores nihil cupiditate qui et.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=45.40088503085442",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 3
            }
        },
        {
            "id": 73,
            "text": "Accusantium excepturi voluptatibus sit rem.",
            "UserId": 1,
            "RestaurantId": 23,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 23,
                "name": "Jacynthe Trantow V",
                "tel": "995-960-3344 x85204",
                "address": "67354 Jonas Light",
                "opening_hours": "08:00",
                "description": "Voluptatem aut cum officia repudiandae doloremque molestiae voluptas. Quia nostrum amet sit nam ipsum dolor veritatis assumenda dignissimos. Debitis a quis ducimus non ex. Facilis omnis impedit quis necessitatibus nobis officiis. Numquam alias similique.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=40.761155965667314",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 5
            }
        },
        {
            "id": 75,
            "text": "Modi laudantium beatae officia voluptates aut.",
            "UserId": 1,
            "RestaurantId": 25,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 25,
                "name": "Adolf Cremin",
                "tel": "615-211-0544 x15613",
                "address": "602 Wilhelmine Lodge",
                "opening_hours": "08:00",
                "description": "Error omnis blanditiis.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=1.6110317847147781",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 4
            }
        },
        {
            "id": 78,
            "text": "Rerum et ut dolorem pariatur ut aut id dolorem.",
            "UserId": 1,
            "RestaurantId": 28,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 28,
                "name": "Damion Muller",
                "tel": "(602) 046-4624 x4810",
                "address": "3923 Wehner Corner",
                "opening_hours": "08:00",
                "description": "Fuga at hic reiciendis.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=85.49537442402593",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 5
            }
        },
        {
            "id": 81,
            "text": "Accusantium et ratione sapiente deserunt consequatur maxime ratione et eos.",
            "UserId": 1,
            "RestaurantId": 31,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 31,
                "name": "Noe Raynor",
                "tel": "1-595-633-3163 x052",
                "address": "2075 Sharon Rapid",
                "opening_hours": "08:00",
                "description": "Quo voluptatum rerum temporibus enim nihil. Ea vitae odit quis ducimus doloremque veniam ut. Sequi debitis at et voluptas consectetur fugit qui. Vero voluptas quasi sed quam et sit. Atque id maxime voluptas. Dolorem voluptas facilis et odit optio sunt excepturi quaerat pariatur.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=43.066607162000324",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 1
            }
        },
        {
            "id": 82,
            "text": "Ratione deleniti deserunt architecto nihil suscipit.",
            "UserId": 1,
            "RestaurantId": 32,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 32,
                "name": "Rafael Schaden III",
                "tel": "1-836-107-5530",
                "address": "7262 Devyn Centers",
                "opening_hours": "08:00",
                "description": "Dicta perspiciatis aliquid voluptate tempore similique.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=2.1540435433775817",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 1
            }
        },
        {
            "id": 85,
            "text": "Perspiciatis minus voluptatibus.",
            "UserId": 1,
            "RestaurantId": 35,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 35,
                "name": "Daphnee Lowe",
                "tel": "548-757-2237",
                "address": "232 Jennings Junctions",
                "opening_hours": "08:00",
                "description": "id dolores quis",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=85.90083920238921",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 4
            }
        },
        {
            "id": 86,
            "text": "In facilis repudiandae minima tempore.",
            "UserId": 1,
            "RestaurantId": 36,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 36,
                "name": "Telly Cole",
                "tel": "1-857-419-5226",
                "address": "307 Schoen Summit",
                "opening_hours": "08:00",
                "description": "Et dolores quis cum expedita voluptatem. Aspernatur et perspiciatis atque sit cupiditate sint voluptatum. Omnis magnam libero.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=75.63614517186328",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 3
            }
        },
        {
            "id": 88,
            "text": "Deleniti maiores aliquid.",
            "UserId": 1,
            "RestaurantId": 38,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 38,
                "name": "Will Simonis",
                "tel": "607.753.9619 x395",
                "address": "18639 Wilton Courts",
                "opening_hours": "08:00",
                "description": "laborum voluptas accusantium",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=75.4278047434088",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 5
            }
        },
        {
            "id": 90,
            "text": "Aut eum corrupti vitae.",
            "UserId": 1,
            "RestaurantId": 40,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 40,
                "name": "Jayde King",
                "tel": "1-843-220-5751 x884",
                "address": "433 Elroy Trail",
                "opening_hours": "08:00",
                "description": "Non sint eos non. Qui laboriosam inventore ipsa libero rem sed iste quas.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=51.75330402381499",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 1
            }
        },
        {
            "id": 91,
            "text": "Ea sed vel.",
            "UserId": 1,
            "RestaurantId": 41,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 41,
                "name": "Bulah Cummerata",
                "tel": "1-272-941-4227 x5104",
                "address": "468 Lemke Isle",
                "opening_hours": "08:00",
                "description": "Autem dolorem qui dignissimos corporis alias neque veniam est. Ducimus saepe illo iste. Enim nisi rerum. Praesentium eveniet temporibus qui voluptate et est.\n \rAccusamus et et at cum nemo. Et voluptatibus excepturi non quo. Amet at quod. Hic sunt velit dolor.\n \rQuasi hic consequatur dolor. Sint laboriosam ullam ipsa atque. Cumque odit assumenda harum occaecati. Voluptatem voluptates fuga.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=77.15667863642383",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 5
            }
        },
        {
            "id": 92,
            "text": "Consectetur amet omnis ut atque qui doloribus architecto adipisci deserunt.",
            "UserId": 1,
            "RestaurantId": 42,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 42,
                "name": "Adrian Weimann",
                "tel": "(102) 131-9224 x2147",
                "address": "04294 Nils Track",
                "opening_hours": "08:00",
                "description": "Et dolores eos sed aut doloribus velit autem quae. Debitis recusandae occaecati ut rerum. Esse dolorum dolorum velit nemo. Culpa mollitia non maxime aspernatur neque aut voluptates architecto.\n \rAnimi veniam nesciunt ut est assumenda voluptatem omnis eligendi. Nam incidunt sint. Reprehenderit et eveniet est laborum ut. Et consequuntur quod ut.\n \rSequi id natus voluptatem repudiandae doloremque pariatur quaerat sit. Quibusdam ipsa voluptatem consequatur at. Illo ullam illum. Enim et cum nulla. Illum debitis et.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=57.71296646754862",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 4
            }
        },
        {
            "id": 94,
            "text": "Veritatis cumque magnam odit nostrum vitae eos doloribus ea.",
            "UserId": 1,
            "RestaurantId": 44,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 44,
                "name": "Madge Moen",
                "tel": "794.584.3958 x1725",
                "address": "6233 Annamae Mission",
                "opening_hours": "08:00",
                "description": "sed ut illum",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=33.163077027772346",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 3
            }
        },
        {
            "id": 96,
            "text": "Voluptas nobis ullam fugiat modi laboriosam et pariatur et at.",
            "UserId": 1,
            "RestaurantId": 46,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 46,
                "name": "Mr. Price Heathcote",
                "tel": "1-234-170-6861",
                "address": "178 Collins Mission",
                "opening_hours": "08:00",
                "description": "Unde maiores error ex.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=38.75335489939356",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 4
            }
        },
        {
            "id": 102,
            "text": "Ut in nam corrupti magnam exercitationem.",
            "UserId": 1,
            "RestaurantId": 2,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 2,
                "name": "Obie Conn",
                "tel": "058-041-5630",
                "address": "940 Lew Bridge",
                "opening_hours": "08:00",
                "description": "Provident odit ut ipsum et recusandae eaque possimus.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=28.912243921415936",
                "viewCounts": 1,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:54:12.000Z",
                "CategoryId": 5
            }
        },
        {
            "id": 105,
            "text": "Rerum rerum quaerat voluptatem.",
            "UserId": 1,
            "RestaurantId": 5,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 5,
                "name": "Mitchel Beatty",
                "tel": "171-324-8413",
                "address": "85408 Francisca Square",
                "opening_hours": "08:00",
                "description": "Aut cumque excepturi exercitationem libero voluptates impedit. Enim animi repellendus tempora doloremque. Esse in delectus sequi ullam sed animi.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=86.63208465551794",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 2
            }
        },
        {
            "id": 106,
            "text": "Eveniet minima et facilis dolores consectetur ipsum eveniet corporis.",
            "UserId": 1,
            "RestaurantId": 6,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 6,
                "name": "Vicenta Gutkowski",
                "tel": "128-905-3953",
                "address": "371 Reuben Vista",
                "opening_hours": "08:00",
                "description": "labore",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=16.659471621888123",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 3
            }
        },
        {
            "id": 109,
            "text": "Iure consectetur vel pariatur quidem officiis voluptatibus similique.",
            "UserId": 1,
            "RestaurantId": 9,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 9,
                "name": "Luz Schaden",
                "tel": "1-712-742-4184",
                "address": "4929 Wisozk Centers",
                "opening_hours": "08:00",
                "description": "Culpa deserunt molestiae eligendi est ex incidunt.\nNisi sit totam.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=6.497835218728576",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 5
            }
        },
        {
            "id": 110,
            "text": "Consectetur qui ipsa voluptate eligendi et eaque.",
            "UserId": 1,
            "RestaurantId": 10,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 10,
                "name": "Corbin Gusikowski",
                "tel": "(506) 198-3977",
                "address": "4747 Lubowitz Brook",
                "opening_hours": "08:00",
                "description": "Aut quia aut ea nostrum quae doloremque necessitatibus. Eos illo quia et. Culpa repellat eos minus necessitatibus aut debitis accusamus.\n \rAssumenda aut itaque corrupti soluta et aut est. Hic non dignissimos odit qui. Optio doloribus rerum molestiae dolorem commodi. Culpa et officiis.\n \rCulpa laborum ea eos praesentium enim quasi eos. Nobis praesentium maxime soluta delectus eveniet reiciendis aut. Voluptates nesciunt et explicabo.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=6.84802493817025",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 5
            }
        },
        {
            "id": 112,
            "text": "Est architecto quasi atque minus quisquam rem quae architecto.",
            "UserId": 1,
            "RestaurantId": 12,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 12,
                "name": "Oliver Padberg",
                "tel": "865-523-0270 x58016",
                "address": "771 Oberbrunner Hollow",
                "opening_hours": "08:00",
                "description": "Magni qui facilis asperiores. Voluptatem cumque corrupti ea at voluptatem. Assumenda esse esse fuga autem dolor qui. Veniam qui eius vero magnam ut inventore magni est.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=22.348939427568215",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 1
            }
        },
        {
            "id": 113,
            "text": "Sit voluptatum odio porro quo similique officia officia.",
            "UserId": 1,
            "RestaurantId": 13,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 13,
                "name": "Mrs. Eileen Lockman",
                "tel": "(597) 404-9974 x003",
                "address": "383 Stroman Center",
                "opening_hours": "08:00",
                "description": "Vitae id incidunt animi qui sapiente perferendis iusto. Nemo placeat ut voluptas quae cupiditate eligendi. Expedita laborum vitae nulla quia ipsam. Et sunt a veniam culpa asperiores qui culpa. Odit reiciendis dolore reprehenderit est est voluptas ut rerum.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=54.950245749491145",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 2
            }
        },
        {
            "id": 117,
            "text": "Esse corrupti nemo aspernatur doloremque ullam.",
            "UserId": 1,
            "RestaurantId": 17,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 17,
                "name": "Garnet Becker",
                "tel": "763.540.2225",
                "address": "698 Daphnee Crossing",
                "opening_hours": "08:00",
                "description": "Fugit vero sapiente facilis neque quaerat possimus voluptatum ab. Doloremque omnis dolor commodi et. Et voluptatem ut voluptatem perferendis aut tempora quia. Aut in eum sit.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=8.238232307545857",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 4
            }
        },
        {
            "id": 122,
            "text": "Accusantium in et voluptas.",
            "UserId": 1,
            "RestaurantId": 22,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 22,
                "name": "Franco Mraz IV",
                "tel": "322.919.2004 x425",
                "address": "700 Swift Plains",
                "opening_hours": "08:00",
                "description": "Nisi qui enim vitae maiores nihil cupiditate qui et.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=45.40088503085442",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 3
            }
        },
        {
            "id": 124,
            "text": "Ut aut praesentium.",
            "UserId": 1,
            "RestaurantId": 24,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 24,
                "name": "Jonathon Medhurst",
                "tel": "078-927-0426",
                "address": "081 Raheem Creek",
                "opening_hours": "08:00",
                "description": "Blanditiis sed aut mollitia nihil est saepe. Est repellendus vel iusto ex tempore. Cupiditate voluptas optio. Illo soluta qui.\n \rReprehenderit in sunt hic in culpa et. Et ab sequi id. Quia et itaque est distinctio ut ex doloremque dolor.\n \rDolorem eligendi animi dolor. Numquam corporis voluptatum. Et odit fugiat est.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=73.44969729408322",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 4
            }
        },
        {
            "id": 128,
            "text": "Minus aut commodi rerum non quis quos laboriosam.",
            "UserId": 1,
            "RestaurantId": 28,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 28,
                "name": "Damion Muller",
                "tel": "(602) 046-4624 x4810",
                "address": "3923 Wehner Corner",
                "opening_hours": "08:00",
                "description": "Fuga at hic reiciendis.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=85.49537442402593",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 5
            }
        },
        {
            "id": 130,
            "text": "Sit sit odio dolorum.",
            "UserId": 1,
            "RestaurantId": 30,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 30,
                "name": "Nikita Boyer",
                "tel": "(284) 625-0408 x71025",
                "address": "101 Heidenreich Roads",
                "opening_hours": "08:00",
                "description": "Labore nihil ipsum quibusdam et laboriosam. Libero deleniti doloribus placeat sit velit rerum ipsam ut repudiandae. Aspernatur dolore doloremque eos. Molestiae animi ipsa labore officia.\n \rNon quaerat eos quidem aut quam facilis quia. Veniam soluta et excepturi ratione non eos repudiandae. Eos reprehenderit rerum soluta qui commodi dolorem rerum. Qui impedit unde alias deleniti. Doloremque unde distinctio.\n \rNumquam reiciendis ex pariatur tempore repellat. Perferendis nulla voluptatum et alias. Reiciendis inventore nihil atque et quia. Earum nobis aliquid voluptas error necessitatibus. Qui perspiciatis commodi aut qui est doloribus iure fuga.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=90.49719023698857",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 2
            }
        },
        {
            "id": 133,
            "text": "Harum eos et qui architecto sit consectetur veniam.",
            "UserId": 1,
            "RestaurantId": 33,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 33,
                "name": "Kenny Dach",
                "tel": "(647) 053-5104 x9921",
                "address": "41601 Lesch Orchard",
                "opening_hours": "08:00",
                "description": "Sequi quo fuga recusandae perspiciatis facere sed et asperiores. In unde id excepturi et repellendus tempore voluptatibus. Et quas et unde. Consequatur quae voluptas dolorem natus odit quis doloribus.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=18.95963061671191",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 5
            }
        },
        {
            "id": 134,
            "text": "Sint quo accusantium qui aperiam delectus et.",
            "UserId": 1,
            "RestaurantId": 34,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 34,
                "name": "Joy Bernhard",
                "tel": "033-240-2167 x43925",
                "address": "6384 Norbert Pike",
                "opening_hours": "08:00",
                "description": "Alias ut repellat et omnis quaerat cum.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=5.417775534122438",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 3
            }
        },
        {
            "id": 145,
            "text": "Sit a quis maxime quaerat delectus inventore molestias est sapiente.",
            "UserId": 1,
            "RestaurantId": 45,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 45,
                "name": "Anjali Kassulke",
                "tel": "313-500-9523 x7668",
                "address": "356 Reanna Fall",
                "opening_hours": "08:00",
                "description": "dolore",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=37.65242985288428",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 1
            }
        },
        {
            "id": 147,
            "text": "Quas quia recusandae.",
            "UserId": 1,
            "RestaurantId": 47,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 47,
                "name": "Flo Paucek",
                "tel": "616-595-6381",
                "address": "0570 Toy Land",
                "opening_hours": "08:00",
                "description": "Explicabo voluptate quam.",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=7.110473595831435",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 4
            }
        },
        {
            "id": 148,
            "text": "Consectetur minus atque rerum consectetur dolorem aut quod.",
            "UserId": 1,
            "RestaurantId": 48,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Restaurant": {
                "id": 48,
                "name": "Fernando Beahan",
                "tel": "782-526-8659 x452",
                "address": "447 Isaiah Garden",
                "opening_hours": "08:00",
                "description": "officia corrupti nisi",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=49.159643827730235",
                "viewCounts": 0,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "CategoryId": 1
            }
        },
        {
            "id": 3152,
            "text": "test",
            "UserId": 1,
            "RestaurantId": 1,
            "createdAt": "2020-03-01T09:31:55.000Z",
            "updatedAt": "2020-03-01T09:31:55.000Z",
            "Restaurant": {
                "id": 1,
                "name": "Dr. Izaiah Ernser",
                "tel": "389.061.3241 x162",
                "address": "7226 Johns Islands",
                "opening_hours": "08:00",
                "description": "quam",
                "image": "https://loremflickr.com/320/240/restaurant,food/?random=90.45122643685453",
                "viewCounts": 28,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-03-01T09:31:35.000Z",
                "CategoryId": 2
            }
        }
    ],
    "FavoritedRestaurants": [
        {
            "id": 3,
            "name": "Herminio Nicolas",
            "tel": "063-480-5811 x2308",
            "address": "52267 Marquardt Corners",
            "opening_hours": "08:00",
            "description": "autem",
            "image": "https://loremflickr.com/320/240/restaurant,food/?random=38.32006179376239",
            "viewCounts": 0,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "CategoryId": 1,
            "Favorite": {
                "UserId": 1,
                "RestaurantId": 3,
                "createdAt": "2020-02-29T16:54:54.000Z",
                "updatedAt": "2020-02-29T16:54:54.000Z"
            }
        }
    ],
    "Followers": [
        {
            "id": 1,
            "name": "root",
            "email": "root@example.com",
            "password": "$2a$10$J9pLpJJ1Tzfe/ZcjdYwXdumyh.3F5E.w/HTxRcH./cl3azhgekgQe",
            "isAdmin": true,
            "image": null,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Followship": {
                "followerId": 1,
                "followingId": 1,
                "createdAt": "2020-02-29T08:11:44.000Z",
                "updatedAt": "2020-02-29T08:11:44.000Z"
            }
        }
    ],
    "Followings": [
        {
            "id": 1,
            "name": "root",
            "email": "root@example.com",
            "password": "$2a$10$J9pLpJJ1Tzfe/ZcjdYwXdumyh.3F5E.w/HTxRcH./cl3azhgekgQe",
            "isAdmin": true,
            "image": null,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Followship": {
                "followerId": 1,
                "followingId": 1,
                "createdAt": "2020-02-29T08:11:44.000Z",
                "updatedAt": "2020-02-29T08:11:44.000Z"
            }
        },
        {
            "id": 2,
            "name": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$NyaAtgRuHx3i7hHlnb5IXOC4Uk4.q1J1iQs3op.ymdCEh7.tOwcH2",
            "isAdmin": false,
            "image": null,
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z",
            "Followship": {
                "followerId": 1,
                "followingId": 2,
                "createdAt": "2020-02-29T08:46:56.000Z",
                "updatedAt": "2020-02-29T08:46:56.000Z"
            }
        }
    ]
  },
  "isFollowed": true
}

export default {
  data() {
    return {
      user: {}
    }
  },
  created() {
    const { id } = this.$route.params
    this.fetchUser(id)
  },
  methods: {
    fetchUser(userId) {
      const user = dummyUser.profile
      this.user = {
        id: userId,
        name: user.name,
        image: user.image
      }
    },
    handleFileChange(e) {
      const files = e.target.files
      if (!files.length) return false

      const image = window.URL.createObjectURL(files[0])
      this.user.image = image
    },
    handleSubmit(e) {
      const form = e.target
      const formData = new FormData(form)
      for (const [name, value] of formData) {
        console.log(`${name}: ${value}`)
      }
    }
  }
}
</script>