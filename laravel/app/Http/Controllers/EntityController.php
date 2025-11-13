<?php

namespace App\Http\Controllers;

use App\Repositories\EntityRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EntityController extends Controller
{
    private $repo;

    public function __construct(EntityRepository $repo)
    {
        $this->repo = $repo;
    }

    public function index(Request $request)
    {
        $entities = $this->repo->list($request->all());

        $entities->transform(function ($entity) {
            $entity->specialities = $entity->specialities->pluck('name')->toArray();
            return $entity;
        });

        return response()->json($entities);
    }

    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name'              => 'required|string|max:255',
                'fantasy_name'      => 'required|string|max:255',
                'cnpj'              => 'required|string|regex:/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/',
                'region'            => 'required|string|max:255',
                'inauguration_date' => 'required|date',
                'status'            => 'boolean',
                'specialities'      => 'required|array|min:5',
                'specialities.*'    => 'exists:specialities,id'
            ],
            [
                'name.required'              => 'O campo Nome é obrigatório.',
                'fantasy_name.required'      => 'O campo Nome Fantasia é obrigatório.',
                'cnpj.required'              => 'O campo CNPJ é obrigatório.',
                'cnpj.regex'                 => 'O CNPJ informado é inválido.',
                'region.required'            => 'O campo Regional é obrigatório.',
                'inauguration_date.required' => 'A Data de Inauguração é obrigatória.',
                'inauguration_date.date'     => 'A Data de Inauguração deve ser uma data válida.',
                'specialities.required'      => 'É necessário selecionar ao menos 5 especialidades.',
                'specialities.min'           => 'É necessário selecionar ao menos 5 especialidades.',
                'specialities.array'         => 'O campo Especialidades é inválido.',
                'specialities.*.exists'      => 'Uma ou mais especialidades selecionadas não existem.'
            ]
        );

        if ($validator->fails()) {
            $errors = $validator->errors()->all();

            $message = '<strong>Dados inválidos</strong><br><br><i>' .
                       implode('<br>', $errors) .
                       '.</i><br><br><strong>Ajuste os dados e tente novamente.</strong>';

            return response()->json([
                'message' => $message,
                'errors'  => $errors
            ], 422);
        }

        $data = $validator->getData();

        $entity = $this->repo->create($data);
        $entity->specialities = $entity->specialities->pluck('name');

        return response()->json([
            'message' => 'Entidade criada com sucesso',
            'data'    => $entity
        ], 201);
    }

    public function show($id)
    {
        $entity = \App\Entity::with('specialities')->find($id);

        if (!$entity) {
            return response()->json(['message' => 'Entidade não encontrada'], 404);
        }

        $entity->specialities = $entity->specialities->pluck('name')->toArray();

        return response()->json($entity);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name'              => 'sometimes|required|string|max:255',
                'fantasy_name'      => 'sometimes|required|string|max:255',
                'cnpj'              => 'sometimes|required|string|regex:/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/',
                'region'            => 'sometimes|required|string|max:255',
                'inauguration_date' => 'sometimes|required|date',
                'status'            => 'boolean',
                'specialities'      => 'sometimes|required|array|min:5',
                'specialities.*'    => 'exists:specialities,id'
            ],
            [
                'name.required'              => 'O campo Nome é obrigatório.',
                'fantasy_name.required'      => 'O campo Nome Fantasia é obrigatório.',
                'cnpj.required'              => 'O campo CNPJ é obrigatório.',
                'cnpj.regex'                 => 'O CNPJ informado é inválido.',
                'region.required'            => 'O campo Regional é obrigatório.',
                'inauguration_date.required' => 'A Data de Inauguração é obrigatória.',
                'inauguration_date.date'     => 'A Data de Inauguração deve ser uma data válida.',
                'specialities.required'      => 'É necessário selecionar ao menos 5 especialidades.',
                'specialities.min'           => 'É necessário selecionar ao menos 5 especialidades.',
                'specialities.array'         => 'O campo Especialidades é inválido.',
                'specialities.*.exists'      => 'Uma ou mais especialidades selecionadas não existem.'
            ]
        );

        if ($validator->fails()) {
            $errors = $validator->errors()->all();

            $message = '<strong>Dados inválidos</strong><br><br><i>' .
                       implode('<br>', $errors) .
                       '</i><br><br><strong>Ajuste os dados e tente novamente.</strong>';

            return response()->json([
                'message' => $message,
                'errors'  => $errors
            ], 422);
        }

        $data = $validator->getData();

        $entity = $this->repo->update($id, $data);
        $entity->specialities = $entity->specialities->pluck('name');

        return response()->json([
            'message' => 'Entidade atualizada com sucesso',
            'data'    => $entity
        ]);
    }

    public function destroy($id)
    {
        $this->repo->delete($id);

        return response()->json([
            'message' => 'Entidade deletada com sucesso'
        ]);
    }
}
