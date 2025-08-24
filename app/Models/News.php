<?php
// app/Models/News.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    protected $fillable = [
        'title', 'description', 'image', 'likes', 'views', 'date', 'author', 'category', 'subcategory', 'readTime'
    ];
}