<?php
namespace app\api\controller;

use app\BaseController;
use Faker;

class Role extends BaseController
{
    public function list()
    {
        $faker = Faker\Factory::create('zh_CN');
        $items = [];
        for ($i = 0; $i < 20; $i++) {
            $items[] = [
                'id' => $faker->numberBetween(1, 100),
                'name' => $faker->name,
                'title' => $faker->title,
                'perm' => [],
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
