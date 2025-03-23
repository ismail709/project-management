<?php

namespace App\Console\Commands;

use App\Models\Sprint;
use Illuminate\Console\Command;

class SetSprintStatusToActive extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sprints:set-active';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This command sets the status of the sprints whose start_date is today to active.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Sprint::where('start_date',today())->where('sprint_status','planned')->update([
            'sprint_status' => 'active'
        ]);

        $this->info('Sprints have been updated successfully!');
    }
}
