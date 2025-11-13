<?php

namespace App\Repositories;

use App\Entity;

class EntityRepository
{
    public function list($filters)
    {
        $query = Entity::with(['specialities', 'region']);

        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('fantasy_name', 'like', "%{$search}%")
                  ->orWhere('cnpj', 'like', "%{$search}%")
                  ->orWhereHas('region', function($qr) use ($search) {
                      $qr->where('name', 'like', "%{$search}%");
                  })
                  ->orWhereHas('specialities', function($q) use ($search) {
                      $q->where('name', 'like', "%{$search}%");
                  });
            });
        }

        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        $sortBy = $filters['sort_by'] ?? 'created_at';
        $sortOrder = $filters['sort_order'] ?? 'desc';

        $query->orderBy($sortBy, $sortOrder);

        if (!empty($filters['paginate']) && $filters['paginate'] === 'true') {
            return $query->paginate($filters['per_page'] ?? 20);
        }

        return $query->get();
    }

    public function create(array $data)
    {
        $specialities = $data['specialities'] ?? [];
        unset($data['specialities']);

        $entity = Entity::create($data);
        $entity->specialities()->sync($specialities);
        return $entity->load(['specialities', 'region']);
    }

    public function update($id, array $data)
    {
        $specialities = $data['specialities'] ?? [];
        unset($data['specialities']);

        $entity = Entity::findOrFail($id);
        $entity->update($data);
        $entity->specialities()->sync($specialities);

        return $entity->load(['specialities', 'region']);
    }

    public function delete($id)
    {
        $entity = Entity::findOrFail($id);
        $entity->specialities()->detach();
        $entity->delete();
        return true;
    }
}
