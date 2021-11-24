import {
    trigger,
    transition,
    style,
    query,
    group,
    animateChild,
    animate,
    keyframes,
    state,
    AnimationTriggerMetadata,
} from '@angular/animations';

export const fader =
    trigger( 'routeAnimations',[
        transition( '* <=> *', [
            style({ overflow: 'hidden' }),
            query(':enter, :leave' , [
                style({
                    position: 'absolute',
                    left: 0,
                    width: '100%',
                    visibility: 'hidden',
                    opacity: 0,
                    height:'100%',
                    
                }),
            ] ,{ optional : true }),
            query(':enter' ,[
                animate('1s ease' , 
                    style({
                        visibility: 'visible' ,
                        height:'100%',
                        opacity: 1,
                        })
                )
            ] ,{ optional : true })
        ] ),
    ])

    export const opacity =
    trigger( 'opacity',[
        transition( '* <=> *', [
            style({overflow: 'hidden',}),
            query(':enter, :leave' , [
                style({
                    position: 'absolute',
                    opacity: 0,
                }),
            ],{ optional : true }),
            query(':enter' ,[
                animate('1s ease' , 
                    style({
                        position: 'absolute',
                        opacity: 1,})
                )
            ],{ optional : true })
        ]),
    ])

    export const fadePost =
    trigger( 'fadePost',[
        transition( '* <=> *', [
            style({overflow: 'hidden',}),
            query(':enter, :leave' , [
                style({
                    opacity: 0,
                }),
            ],{ optional : true }),
            query(':enter' ,[
                animate('1s ease' , 
                    style({
                        opacity: 1,})
                )
            ],{ optional : true })
        ]),
    ])

    export const slide =
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)',opacity:0}),
        animate('300ms ease-in', style({transform: 'translateY(0%)',opacity:1}))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({transform: 'translateY(-100%)',opacity:0}))
      ])
    ])
     export const categorizedPosts: AnimationTriggerMetadata = trigger('categorizedPosts', [
        transition('done => entering', [
            style({
                'margin-left': '90%'
            }),
            animate('200ms ease',
                style({ 'margin-left': '*' }))
        ]),
    ]);
