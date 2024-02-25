<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TodoList extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'todolist';

    protected $primaryKey = 'id';

    protected $fillable = [
        'task_name',
        'status',
        'user_id'
    ];
}
