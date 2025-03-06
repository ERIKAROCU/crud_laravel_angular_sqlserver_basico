<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Agregar el campo 'rol'
            $table->enum('rol', ['admin', 'user'])->default('user'); // rol con valores 'admin' o 'user'

            // Agregar el campo 'is_active'
            $table->boolean('is_active')->default(true); // is_active, por defecto es true
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('rol');
            $table->dropColumn('is_active');
        });
    }
};
