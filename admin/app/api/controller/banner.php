<?php
namespace app\api\controller;

use app\BaseController;
use Faker;

class Banner extends BaseController
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
                'link' => $faker->url,
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
