<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Env;

class ProviderCreation extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $request;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($request)
    {
        $this->request = $request;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(['address' => 'request@rapha.org', 'name' => Env::get("APP_NAME")])
            ->subject('Un nouveau compte créé pour vous')
            ->with(["request" => $this->request])
            ->view('layouts.mails.providerInit');
    }
}
