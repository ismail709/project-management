<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TaskResource\Pages;
use App\Filament\Resources\TaskResource\RelationManagers;
use App\Models\Task;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class TaskResource extends Resource
{
    protected static ?string $model = Task::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('parent_task_id')->relationship('parentTask', 'task_title'),
                Forms\Components\Select::make('sprint_id')->relationship('sprint', 'sprint_name'),
                Forms\Components\Select::make('project_id')->relationship('project', 'project_name')
                    ->required(),
                Forms\Components\TextInput::make('task_title')
                    ->required()
                    ->maxLength(255),
                Forms\Components\Textarea::make('task_description')
                    ->columnSpanFull(),
                Forms\Components\Select::make('task_type_id')->relationship('type', 'task_type_name')
                    ->required(),
                Forms\Components\Select::make('task_priority')->options([
                    'low' => 'Low',
                    'regular' => 'Regular',
                    'high' => 'High',
                    'critical' => 'Critical'
                ])
                    ->default('regular')
                    ->required(),
                Forms\Components\Select::make('task_status')->options([
                    'todo' => 'Todo',
                    'in_progress' => 'In progress',
                    'done' => 'Done'
                ])
                    ->default('todo')
                    ->required(),
                Forms\Components\Select::make('created_by')->relationship('createdBy', 'name')
                    ->required(),
                Forms\Components\TextInput::make('estimated_days')
                    ->numeric(),
                Forms\Components\TextInput::make('actual_days')
                    ->numeric(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('parentTask.task_title')
                    ->sortable()
                    ->searchable()
                    ->placeholder('No data')
                    ->formatStateUsing(fn($state) => ucwords($state)),
                Tables\Columns\TextColumn::make('sprint.sprint_name')
                    ->sortable()
                    ->searchable()
                    ->placeholder('No data')
                    ->formatStateUsing(fn($state) => ucwords($state)),
                Tables\Columns\TextColumn::make('project.project_name')
                    ->sortable()
                    ->searchable()
                    ->placeholder('No data')
                    ->formatStateUsing(fn($state) => ucwords($state)),
                Tables\Columns\TextColumn::make('task_title')
                    ->searchable()
                    ->sortable()
                    ->formatStateUsing(fn($state) => ucwords($state)),
                Tables\Columns\TextColumn::make('type.task_type_name')
                    ->sortable(),
                Tables\Columns\TextColumn::make('task_priority')
                    ->sortable()
                    ->formatStateUsing(fn($state) => match ($state) {
                        'low' => 'Low',
                        'regular' => 'Regular',
                        'high' => 'High',
                        'critical' => 'Critical',
                        default => $state
                    }),
                Tables\Columns\TextColumn::make('task_status')
                    ->sortable()
                    ->formatStateUsing(fn($state) => match ($state) {
                        'todo' => 'Todo',
                        'in_progress' => 'In progress',
                        'done' => 'Done',
                        default => $state
                    }),
                Tables\Columns\TextColumn::make('estimated_days')
                    ->numeric()
                    ->sortable()
                    ->placeholder('No data'),
                Tables\Columns\TextColumn::make('actual_days')
                    ->numeric()
                    ->sortable()
                    ->placeholder('No data'),
                Tables\Columns\TextColumn::make('createdBy.name')
                    ->sortable()
                    ->searchable()
                    ->formatStateUsing(fn($state) => ucwords($state)),
                Tables\Columns\TextColumn::make('deleted_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\TrashedFilter::make(),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\Action::make('assign_to')
                    ->form(fn($record) => [
                        Forms\Components\Select::make('user_id')
                            ->label('User')
                            ->options(
                                $record->project->users->pluck('name', 'id')
                            )
                    ])
                    ->action(fn($data, $record) => $record->assignedTo()->attach(
                        $data['user_id']
                    )),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\ForceDeleteBulkAction::make(),
                    Tables\Actions\RestoreBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTasks::route('/'),
            'create' => Pages\CreateTask::route('/create'),
            'view' => Pages\ViewTask::route('/{record}'),
            'edit' => Pages\EditTask::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }
}
