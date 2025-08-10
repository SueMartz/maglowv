<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Comentario;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Illuminate\Support\Str;

class ComentarioController extends Controller
{
    public function index()
    {
        return Comentario::where('aprobado', true)->orderBy('created_at', 'desc')->get();
    }

     public function pendientes()
    {
        return Comentario::where('aprobado', false)->orderBy('created_at', 'desc')->get();
    }

   

    public function aprobar($id)
    {
        $comentario = Comentario::findOrFail($id);
        $comentario->aprobado = true;
        $comentario->save();

        return response()->json(['message' => 'Comentario aprobado']);
    }

    public function destroy($id)
    {
        Comentario::findOrFail($id)->delete();
        return response()->json(['message' => 'Comentario eliminado']);
    }
}
