<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;

class TodoController extends Controller
{
    public function index()
    {
        return Todo::all();
    }

    public function show($id)
    {
        return Todo::findOrFail($id);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:todos',
            'description' => 'required',
        ]);
        return Todo::create($request->all());
    }

    public function update(Request $request, $id)
    {
        $todo = Todo::findOrFail($id);
        $request->validate([
            'name' => 'required|unique:todos,name,' . $id,
            'description' => 'required',
        ]);
        $todo->update($request->all());
        return $todo;
    }

    public function destroy($id)
    {
        Todo::destroy($id);
        return response()->json(['message' => 'Todo deleted']);
    }

    public function markComplete($id)
{
    $todo = Todo::findOrFail($id);
    $todo->update(['status' => 'complete']);
    return response()->json($todo); // Ensure you return JSON response
}

public function markIncomplete($id)
{
    $todo = Todo::findOrFail($id);
    $todo->update(['status' => 'incomplete']);
    return response()->json($todo); // Ensure you return JSON response
}
}
