<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'created_at' => (new Carbon($this->created_at))->format("Y-m-d"),
            'due_date' => (new Carbon($this->due_date))->format("Y-m-d"),
            'status' => $this->status,
            'priority' => $this->priority,
            'image_path' => $this->image_path,
            'assigned_user_id' => $this->assigned_user_id ? new UserResource($this->assignedUser) : null,
            'project_id' => new ProjectResource($this->project),
            'created_by' => new UserResource($this->createdBy),
            'updated_by' => new UserResource($this->updatedBy),
        ];
    }
}
