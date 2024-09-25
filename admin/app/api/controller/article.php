<?php
namespace app\api\controller;

use app\BaseController;
use Faker;

class Article extends BaseController
{
    public function list()
    {
        $faker = Faker\Factory::create('zh_CN');
        $items = [];
        for ($i = 0; $i < 20; $i++) {
            $items[] = [
                'id' => $faker->numberBetween(1, 100),
                'icon' => 'https://dummyimage.com/100x50',
                'title' => $faker->title,
                'category' => $faker->randomElement(['新闻', '公告', '动态']),
                'read' => $faker->numberBetween(1, 100),
                'comment' => $faker->numberBetween(1, 100),
                'created_at' => date('Y-m-d H:i:s'),
                'content' => $faker->text,
                'author' => $faker->name,
                'status' => $faker->randomElement([0, 1]),
            ];
        }
        $data = [
            'total' => 100,
            'items' => $items
        ];
        return $this->success($data);
    }

    public function category() {
        $faker = Faker\Factory::create('zh_CN');
        $items = [];
        for ($i = 0; $i < 20; $i++) {
            $items[] = [
                'id' => $faker->numberBetween(1, 100),
                'title' => $faker->title,
                'status' => $faker->randomElement([0, 1]),
            ];
        }
        $data = [
            'total' => 100,
            'items' => $items
        ];
        return $this->success($data);
    }
}
